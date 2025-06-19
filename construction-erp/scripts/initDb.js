const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'site_manager', 'worker'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

const User = mongoose.model('User', userSchema);

const ADMIN_PASSWORD = 'admin123'; // Clear password for reference

async function initializeDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/construction-erp');
        console.log('Connected to MongoDB');

        // Delete existing admin if exists
        await User.deleteOne({ email: 'admin@local.com' });
        console.log('Removed existing admin user if any');

        // Create new admin user
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@local.com',
            password: hashedPassword,
            role: 'admin',
            status: 'active'
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        
        // Verify the admin user
        const verifyAdmin = await User.findOne({ email: 'admin@local.com' });
        console.log('\nAdmin user details:', {
            name: verifyAdmin.name,
            email: verifyAdmin.email,
            role: verifyAdmin.role,
            status: verifyAdmin.status
        });

        console.log('\nYou can login with:');
        console.log('Email: admin@local.com');
        console.log('Password:', ADMIN_PASSWORD);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

initializeDatabase(); 