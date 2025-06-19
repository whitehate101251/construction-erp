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

async function createAdminUser() {
    try {
        await mongoose.connect('mongodb://localhost:27017/construction-erp');
        console.log('Connected to local MongoDB');

        // Check if admin exists
        const existingAdmin = await User.findOne({ email: 'admin@local.com' });
        
        if (existingAdmin) {
            console.log('Admin user already exists:', {
                email: existingAdmin.email,
                role: existingAdmin.role,
                status: existingAdmin.status
            });
            console.log('\nYou can login with:');
            console.log('Email: admin@local.com');
            console.log('Password: admin123');
        } else {
            // Create admin user
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const adminUser = new User({
                name: 'Admin User',
                email: 'admin@local.com',
                password: hashedPassword,
                role: 'admin',
                status: 'active'
            });

            await adminUser.save();
            console.log('Admin user created successfully');
            console.log('\nYou can now login with:');
            console.log('Email: admin@local.com');
            console.log('Password: admin123');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

createAdminUser(); 