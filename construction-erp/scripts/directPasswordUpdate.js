const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function updateManagerPassword() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');

        // Hash password manually
        const hashedPassword = await bcrypt.hash('manager123', 10);
        
        // Update directly in the database - bypassing any model hooks
        const result = await mongoose.connection.collection('users').updateOne(
            { email: 'manager@local.com' },
            { $set: { password: hashedPassword } }
        );

        if (result.matchedCount === 0) {
            console.log('No user found with email manager@local.com');
        } else if (result.modifiedCount === 0) {
            console.log('User found but password was not modified');
        } else {
            console.log('Password updated successfully!');
        }
        
        console.log('Updated credentials:');
        console.log('Manager: manager@local.com / manager123');
        
    } catch (error) {
        console.error('Error updating password:', error);
    } finally {
        // Close the MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
}

// Run the password update
updateManagerPassword(); 