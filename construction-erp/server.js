const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const workerRoutes = require('./routes/workerRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const siteRoutes = require('./routes/siteRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Enhanced logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    // Log headers for debugging
    console.log('Request headers:', req.headers);
    next();
});

// Basic middleware
app.use(cors({
    origin: true, // Allow all origins
    credentials: true // Allow credentials
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request body logging middleware
app.use((req, res, next) => {
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request body:', req.body);
    }
    next();
});

// Serve static files for public assets - only allow access to login related files without auth
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path, stat) => {
    // If the path is not login related and no token is present, don't serve it
    const isLoginFile = path.endsWith('login.html') || 
                         path.includes('/js/login.js') || 
                         path.includes('/css/login.css') ||
                         path.includes('/images/');
    
    if (!isLoginFile) {
      res.set('X-Auth-Required', 'true');
    }
  }
}));

// Root route - redirect to login
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Handle direct access to index.html
app.get('/index.html', (req, res) => {
    res.redirect('/login.html');
});

// API Routes
app.use('/api/auth', authRoutes);

// Middleware to protect all other routes
app.use((req, res, next) => {
  // Skip auth check for API auth routes and login-related resources
  if (req.path === '/api/auth/login' || 
      req.path === '/login.html' || 
      req.path.startsWith('/js/login') || 
      req.path.startsWith('/css/login') ||
      req.path.startsWith('/images/') ||
      req.path === '/') {
    return next();
  }

  // Check for authentication
  const token = req.query.token || req.headers.authorization;
  if (!token) {
    console.log('Access denied to', req.path, '- redirecting to login');
    return res.redirect('/login.html');
  }

  // Verify token (this should be handled by middleware)
  try {
    // Remove Bearer prefix if present
    let tokenValue = token;
    if (tokenValue.startsWith('Bearer ')) {
      tokenValue = tokenValue.slice(7);
    }
    
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    console.log('Token verified successfully for user:', decoded.userId);
    next();
  } catch (error) {
    console.log('Invalid token error:', error.message);
    return res.redirect('/login.html');
  }
});

// Protected API Routes
app.use('/api/workers', workerRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/users', userRoutes);

// Handle 404 routes
app.use((req, res) => {
    if (req.path.startsWith('/api')) {
        // For XHR requests, return JSON
        if (req.xhr || (req.headers.accept && req.headers.accept.includes('application/json'))) {
            return res.status(404).json({ 
                status: 'error',
                message: `API endpoint not found: ${req.path}` 
            });
        }
        // For normal requests, redirect to the error page
        return res.redirect(`/error.html?message=${encodeURIComponent(`API endpoint not found`)}&path=${encodeURIComponent(req.path)}`);
    }
    
    // Check if requesting a specific HTML page
    if (req.path.endsWith('.html') || req.path === '/') {
        return res.redirect('/login.html');
    }
    
    // For static assets and other resources, continue to 404
    res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    console.error('Stack:', err.stack);
    
    // For XHR requests or API paths, return JSON
    if (req.xhr || 
        (req.headers.accept && req.headers.accept.includes('application/json')) || 
        req.path.startsWith('/api')) {
        return res.status(err.statusCode || 500).json({
            status: 'error',
            message: err.message || 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err : {}
        });
    }
    
    // For normal requests, redirect to error page
    res.redirect(`/error.html?message=${encodeURIComponent(err.message || 'Internal server error')}`);
});

// Create admin user if it doesn't exist
async function createAdminIfNotExists() {
    try {
        console.log('Checking for existing admin user...');
        const adminExists = await User.findOne({ username: 'admin' });
        console.log('Admin user exists?', !!adminExists);
        
        if (!adminExists) {
            console.log('Creating new admin user...');
            const adminUser = await User.create({
                name: 'Admin',
                username: 'admin',
                email: 'admin@local.com',
                password: 'admin123',
                role: 'admin',
                phone: '1234567890',
                status: 'active'
            });
            console.log('Admin user created successfully:', {
                id: adminUser._id,
                username: adminUser.username,
                role: adminUser.role
            });
        } else {
            console.log('Using existing admin user:', {
                id: adminExists._id,
                username: adminExists.username,
                role: adminExists.role
            });
        }
    } catch (error) {
        console.error('Error in createAdminIfNotExists:', error);
    }
}

// Connect to MongoDB
console.log('Attempting to connect to MongoDB at:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Successfully connected to MongoDB');
        await createAdminIfNotExists();
        const PORT = 3000; // Use a different port
        app.listen(PORT, '0.0.0.0', () => { // Listen on all interfaces
            console.log(`Server running on port ${PORT}`);
            console.log(`Local URL: http://localhost:${PORT}`);
            console.log('Server listening on all network interfaces');
        }).on('error', (error) => {
            console.error('Failed to start server:', error);
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                code: error.code
            });
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.error('Error details:', {
            name: err.name,
            message: err.message,
            code: err.code
        });
    }); 