const User = require('../models/User');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};

// Login
exports.login = async (req, res, next) => {
  try {
    console.log('Login attempt received:', {
      username: req.body.username,
      hasPassword: !!req.body.password
    });

    const { username, password } = req.body;

    // Check if username and password exist
    if (!username || !password) {
      console.log('Missing credentials:', { username: !!username, password: !!password });
      throw new AppError('Please provide username and password', 400);
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ username }).select('+password');
    console.log('User lookup result:', user ? {
      id: user._id,
      username: user.username,
      role: user.role,
      status: user.status,
      hasPassword: !!user.password
    } : 'User not found');

    if (!user) {
      console.log('Login failed: User not found');
      throw new AppError('Incorrect username or password', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password validation:', {
      isValid: isPasswordValid,
      username: user.username
    });

    if (!isPasswordValid) {
      console.log('Login failed: Invalid password');
      throw new AppError('Incorrect username or password', 401);
    }

    // Check if user is active
    if (user.status !== 'active') {
      console.log('Login failed: Inactive user', {
        userId: user._id,
        status: user.status
      });
      throw new AppError('Your account is inactive. Please contact admin.', 401);
    }

    // Generate token
    const token = generateToken(user._id);
    console.log('Login successful:', {
      userId: user._id,
      role: user.role,
      tokenGenerated: !!token
    });

    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    next(error);
  }
};

// Create new user (Admin only)
exports.createUser = async (req, res, next) => {
  try {
    const { name, username, password, role, phone, email } = req.body;

    // Check if user is admin
    if (req.user.role !== 'admin') {
      throw new AppError('Only admin can create new users', 403);
    }

    // Validate required fields
    if (!name || !username || !password || !role) {
      throw new AppError('Name, username, password, and role are required', 400);
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new AppError('User with this username already exists', 400);
    }

    const user = await User.create({
      name,
      username,
      email: email || '',
      password,
      role,
      phone
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw new AppError('Only admin can view all users', 403);
    }

    const users = await User.find().select('-password');
    res.status(200).json({
      status: 'success',
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};

// Update user status (Admin only)
exports.updateUserStatus = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw new AppError('Only admin can update user status', 403);
    }

    const { userId } = req.params;
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile (any authenticated user can update their own profile)
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone, password, username } = req.body;
    const userId = req.params.id;

    // Only allow admins to update other users
    if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to update this user'
      });
    }

    // Find the user to update
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Check username uniqueness if being updated
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: userId } 
      });
      
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Username already in use by another user'
        });
      }
    }

    // Update basic info
    if (name) user.name = name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    
    // Update password if provided
    if (password) {
      user.password = password; // The model will auto-hash via pre-save hook
    }

    // Save the updated user
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Log the response for debugging
    console.log('User profile updated successfully:', {
      userId: userResponse._id,
      name: userResponse.name,
      username: userResponse.username
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: userResponse
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    next(error);
  }
};

// Change password for logged in user
exports.changePassword = async (req, res, next) => {
  try {
    console.log('Change password request received:', { 
      userId: req.user ? req.user._id : 'not set',
      body: req.body 
    });
    
    const { currentPassword, newPassword } = req.body;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Current password and new password are required'
      });
    }
    
    // Get user with password field
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    console.log('User found for password change:', { 
      id: user._id,
      username: user.username,
      hasPassword: !!user.password 
    });
    
    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    console.log('Password validation result:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    console.log('Password updated successfully for user:', user._id);
    
    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    next(error);
  }
}; 