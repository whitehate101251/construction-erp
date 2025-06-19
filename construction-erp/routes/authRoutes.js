const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/login', authController.login);

// Protected routes (require authentication)
router.use(auth);

// Admin only routes
router.post('/users', authController.createUser);
router.get('/users', authController.getAllUsers);
router.patch('/users/:userId/status', authController.updateUserStatus);

module.exports = router; 