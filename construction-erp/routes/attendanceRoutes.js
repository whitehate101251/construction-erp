const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Mark in time
router.post('/mark-in', attendanceController.markInTime);

// Mark out time
router.post('/mark-out', attendanceController.markOutTime);

// Add attendance manually (for site managers)
router.post('/add', attendanceController.addAttendance);

// Get attendance for a site
router.get('/site/:siteId', attendanceController.getSiteAttendance);

// Get attendance for a specific date
router.get('/date/:date', attendanceController.getDateAttendance);

// Get attendance for a worker
router.get('/worker/:workerId', attendanceController.getWorkerAttendance);

// Update attendance record
router.patch('/:attendanceId', attendanceController.updateAttendance);

// Get pending verification count
router.get('/pending-verification', attendanceController.getPendingVerificationCount);

// Get sites with attendance data
router.get('/sites-with-attendance', attendanceController.getSitesWithAttendance);

// Verify attendance records
router.post('/verify', attendanceController.verifyAttendance);

// Reject attendance records
router.post('/reject', attendanceController.rejectAttendance);

// Modify attendance record (for site incharge)
router.post('/modify', attendanceController.modifyAttendance);

// Get all attendance records (with optional filtering)
router.get('/', attendanceController.getAllAttendance);

module.exports = router; 