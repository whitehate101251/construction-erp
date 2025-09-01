const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');

async function fixUserPasswords() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to database');

        // Get all users
        const users = await User.find();
        console.log('\n👥 Current users:');
        users.forEach(user => {
            console.log(`- ${user.name} (${user.username}) - ${user.role}`);
        });

        // Update passwords for test users
        const testUsers = [
            { username: 'si1', password: 'password123' },
            { username: 'foremen1', password: 'password123' },
            { username: 'admin', password: 'admin123' }
        ];

        for (const testUser of testUsers) {
            const user = await User.findOne({ username: testUser.username });
            if (user) {
                // Hash the password
                const hashedPassword = await bcrypt.hash(testUser.password, 12);
                user.password = hashedPassword;
                await user.save();
                console.log(`✅ Updated password for ${user.name} (${user.username})`);
            }
        }

        console.log('\n🎉 Password update completed!');
        console.log('\n📋 Login credentials:');
        console.log('Admin: admin / admin123');
        console.log('Site Manager: foremen1 / password123');
        console.log('Site Incharge: si1 / password123');

    } catch (error) {
        console.error('❌ Failed to update passwords:', error);
    } finally {
        await mongoose.connection.close();
    }
}

fixUserPasswords();