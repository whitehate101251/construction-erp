const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// Login route - public route, no auth required
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt:', req.body);
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide username and password'
            });
        }

        // Find user
        const user = await User.findOne({ username });
        console.log('User found:', user ? {
            id: user._id,
            username: user.username,
            role: user.role,
            status: user.status
        } : null);

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid username or password'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid username or password'
            });
        }

        // Check if user is active
        if (user.status === 'inactive') {
            return res.status(401).json({
                status: 'error',
                message: 'Your account is inactive. Please contact admin.'
            });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            status: 'success',
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during login'
        });
    }
});

// Protected routes below this point - require authentication
router.use(auth);

// Change password route
router.post('/change-password', authController.changePassword);

// User-specific password change route
router.post('/:id/change-password', async (req, res) => {
    try {
        console.log('User-specific password change route hit:', {
            userId: req.params.id,
            requestingUser: req.user._id
        });
        
        const { currentPassword, newPassword } = req.body;
        
        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'Current password and new password are required'
            });
        }
        
        // Only allow changing your own password unless you're an admin
        if (req.user._id.toString() !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'You can only change your own password'
            });
        }
        
        // Get user with password field
        const user = await User.findById(req.params.id).select('+password');
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
        res.status(500).json({
            status: 'error',
            message: 'Error changing password: ' + error.message
        });
    }
});

// Get all users (filtered by role if specified)
router.get('/', async (req, res) => {
    try {
        const { role } = req.query;
        const filter = role ? { role } : {};
        
        const users = await User.find(filter).select('-password');
        res.json({
            status: 'success',
            data: { users }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching users'
        });
    }
});

// Create new user (requires auth and admin role)
router.post('/', auth, async (req, res) => {
    try {
        // Check if the requesting user is an admin
        const requestingUser = await User.findById(req.user._id);
        if (!requestingUser || requestingUser.role !== 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Access denied. Admin only.'
            });
        }

        const { name, username, password, role, phone, email } = req.body;

        // Validate input
        if (!name || !username || !password || !role) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide all required fields: name, username, password, and role'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User with this username already exists'
            });
        }

        // Create user - do not hash the password here, let the model's pre-save hook handle it
        const user = await User.create({
            name,
            username,
            email: email || '',
            password, // Raw password - will be hashed by the pre-save hook
            role,
            phone,
            status: 'active'
        });

        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    role: user.role,
                    status: user.status
                }
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating user'
        });
    }
});

// Update user status (requires auth and admin role)
router.patch('/:userId/status', auth, async (req, res) => {
    try {
        // Check if the requesting user is an admin
        const requestingUser = await User.findById(req.user._id);
        if (!requestingUser || requestingUser.role !== 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Access denied. Admin only.'
            });
        }

        const { status } = req.body;
        if (!status || !['active', 'inactive'].includes(status)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid status'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { status },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating user status'
        });
    }
});

// Delete user (requires auth and admin role)
router.delete('/:userId', auth, async (req, res) => {
    try {
        // Check if the requesting user is an admin
        const requestingUser = await User.findById(req.user._id);
        if (!requestingUser || requestingUser.role !== 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Access denied. Admin only.'
            });
        }

        const userId = req.params.userId;

        // Prevent admin from deleting themselves
        if (userId === req.user._id.toString()) {
            return res.status(400).json({
                status: 'error',
                message: 'You cannot delete your own account'
            });
        }

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error deleting user'
        });
    }
});

// Admin route for updating users
router.patch('/admin/:id', auth, async (req, res) => {
    try {
        console.log('Updating user with ID:', req.params.id);
        console.log('Update data:', req.body);
        
        // Check if the requesting user is an admin
        const requestingUser = await User.findById(req.user._id);
        if (!requestingUser || requestingUser.role !== 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Access denied. Admin only.'
            });
        }

        const { name, username, email, phone, password } = req.body;
        const updateData = {};

        // Only include fields that are provided and valid
        if (name) updateData.name = name;
        if (username) {
            // Check if username already exists (for another user)
            const existingUser = await User.findOne({ 
                username, 
                _id: { $ne: req.params.id } 
            });
            
            if (existingUser) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Username already in use by another user'
                });
            }
            
            updateData.username = username;
        }
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        
        // If password is provided, hash it
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating user: ' + error.message
        });
    }
});

// Update user profile
router.patch('/:id', auth, authController.updateProfile);

module.exports = router; 