const mongoose = require('mongoose');
const User = require('../models/User');
const Site = require('../models/Site');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function setupTestData() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');

        // Create admin user if not exists
        console.log('Checking for admin user...');
        let adminUser = await User.findOne({ email: 'admin@local.com' });
        
        if (!adminUser) {
            console.log('Creating admin user...');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            adminUser = await User.create({
                name: 'Admin',
                email: 'admin@local.com',
                password: hashedPassword,
                role: 'admin',
                status: 'active'
            });
            console.log('Admin user created:', adminUser._id);
        } else {
            console.log('Admin user already exists:', adminUser._id);
        }

        // Create a test site manager if not exists
        console.log('Checking for test site manager...');
        let siteManager = await User.findOne({ email: 'manager@local.com' });
        
        if (!siteManager) {
            console.log('Creating test site manager...');
            const hashedPassword = await bcrypt.hash('manager123', 10);
            siteManager = await User.create({
                name: 'Test Manager',
                email: 'manager@local.com',
                password: hashedPassword,
                role: 'site_manager',
                phone: '1234567890',
                status: 'active'
            });
            console.log('Site manager created:', siteManager._id);
        } else {
            console.log('Site manager already exists:', siteManager._id);
        }

        // Create a test site if not exists
        console.log('Checking for test site...');
        let testSite = await Site.findOne({ name: 'Test Site' });
        
        if (!testSite) {
            console.log('Creating test site...');
            testSite = await Site.create({
                name: 'Test Site',
                location: 'Test Location',
                siteManager: siteManager._id,
                status: 'active'
            });
            console.log('Test site created:', testSite._id);
        } else {
            console.log('Test site already exists:', testSite._id);
        }

        console.log('Test data setup complete!');
        console.log('\nCredentials:');
        console.log('Admin: admin@local.com / admin123');
        console.log('Manager: manager@local.com / manager123');
    } catch (error) {
        console.error('Error setting up test data:', error);
    } finally {
        // Close the MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Run the setup
setupTestData(); 