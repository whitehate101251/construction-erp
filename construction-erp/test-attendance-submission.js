const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Worker = require('./models/Worker');
const Site = require('./models/Site');
const Attendance = require('./models/Attendance');

async function testAttendanceSubmission() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to correct database:', mongoose.connection.db.databaseName);

        // Get current data
        const users = await User.find();
        const workers = await Worker.find();
        const sites = await Site.find();
        const attendance = await Attendance.find();

        console.log('\n📊 Current data in correct database:');
        console.log(`- Users: ${users.length}`);
        console.log(`- Workers: ${workers.length}`);
        console.log(`- Sites: ${sites.length}`);
        console.log(`- Attendance: ${attendance.length}`);

        // Find a site manager and site incharge
        const siteManager = users.find(u => u.role === 'site_manager');
        const siteIncharge = users.find(u => u.role === 'site_incharge');
        
        if (!siteManager) {
            console.log('❌ No site manager found. Creating one...');
            const newSiteManager = await User.create({
                name: 'Test Foreman',
                username: 'testforeman',
                email: 'testforeman@test.com',
                password: 'password123',
                role: 'site_manager',
                phone: '9876543210',
                status: 'active'
            });
            console.log('✅ Created site manager:', newSiteManager.name);
        }

        if (!siteIncharge) {
            console.log('❌ No site incharge found. Creating one...');
            const newSiteIncharge = await User.create({
                name: 'Test Site Incharge',
                username: 'testincharge',
                email: 'testincharge@test.com',
                password: 'password123',
                role: 'site_incharge',
                phone: '9876543211',
                status: 'active'
            });
            console.log('✅ Created site incharge:', newSiteIncharge.name);
        }

        // Create test workers if none exist
        if (workers.length === 0) {
            console.log('❌ No workers found. Creating test workers...');
            const site = sites[0];
            
            const worker1 = await Worker.create({
                name: 'Test Worker 1',
                fatherName: 'Father 1',
                contact: { phone: '9876543212' },
                role: 'laborer',
                assignedSite: site._id,
                status: 'active'
            });

            const worker2 = await Worker.create({
                name: 'Test Worker 2',
                fatherName: 'Father 2',
                contact: { phone: '9876543213' },
                role: 'laborer',
                assignedSite: site._id,
                status: 'active'
            });

            console.log('✅ Created workers:', worker1.name, 'and', worker2.name);
        }

        // Create test attendance submission
        const finalSiteManager = await User.findOne({ role: 'site_manager' });
        const finalWorkers = await Worker.find();
        const finalSite = sites[0];

        if (finalSiteManager && finalWorkers.length > 0 && finalSite) {
            console.log('\n📝 Creating test attendance submission...');
            
            for (const worker of finalWorkers) {
                const testAttendance = new Attendance({
                    worker: worker._id,
                    site: finalSite._id,
                    date: new Date(),
                    status: 'present',
                    inTime: new Date(),
                    outTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
                    markedBy: finalSiteManager._id,
                    submittedToIncharge: true,
                    submissionTimestamp: new Date(),
                    verified: false,
                    workingHours: 8
                });

                await testAttendance.save();
                console.log(`✅ Created attendance for ${worker.name}`);
            }

            console.log('\n🎉 Test attendance created successfully!');
            console.log('\n📋 Login credentials:');
            console.log('Site Manager (to submit attendance):');
            finalSiteManager && console.log(`- Username: ${finalSiteManager.username}`);
            console.log('- Password: password123');
            
            const finalSiteIncharge = await User.findOne({ role: 'site_incharge' });
            console.log('\nSite Incharge (to review attendance):');
            finalSiteIncharge && console.log(`- Username: ${finalSiteIncharge.username}`);
            console.log('- Password: password123');

            // Test the API endpoint that site incharge uses
            console.log('\n🧪 Testing site incharge API...');
            const today = new Date().toISOString().split('T')[0];
            const startDate = new Date(today);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);

            const pendingAttendance = await Attendance.find({
                date: { $gte: startDate, $lt: endDate },
                submittedToIncharge: true,
                verified: false
            }).populate('worker', 'name').populate('site', 'name');

            console.log(`📊 Found ${pendingAttendance.length} pending attendance records:`);
            pendingAttendance.forEach(record => {
                console.log(`- ${record.worker.name} at ${record.site.name}: ${record.status}`);
            });

        } else {
            console.log('❌ Missing required data to create test attendance');
        }

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await mongoose.connection.close();
    }
}

testAttendanceSubmission();