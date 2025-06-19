const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function resetManagerPassword() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');

        // Find site manager
        console.log('Looking for site manager...');
        const siteManager = await User.findOne({ email: 'manager@local.com' });
        
        if (!siteManager) {
            console.log('Site manager not found, cannot reset password');
            return;
        }
        
        console.log('Site manager found:', {
            id: siteManager._id,
            email: siteManager.email,
            role: siteManager.role,
            status: siteManager.status
        });
        
        // Reset password
        console.log('Resetting password...');
        const hashedPassword = await bcrypt.hash('manager123', 10);
        
        siteManager.password = hashedPassword;
        await siteManager.save();
        
        console.log('Password reset successfully!');
        console.log('\nUpdated credentials:');
        console.log('Manager: manager@local.com / manager123');
        
    } catch (error) {
        console.error('Error resetting password:', error);
    } finally {
        // Close the MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Run the password reset
resetManagerPassword(); 