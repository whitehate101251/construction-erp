const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function createAdminUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create admin user
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
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await mongoose.connection.close();
    }
}

createAdminUser(); 