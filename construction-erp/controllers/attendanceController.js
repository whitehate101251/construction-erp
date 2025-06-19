const Attendance = require('../models/Attendance');
const Worker = require('../models/Worker');
const Site = require('../models/Site');

// Mark attendance (in time)
exports.markInTime = async (req, res) => {
  try {
    const { workerId, siteId } = req.body;
    const inTime = new Date();
    
    // Check if worker exists and belongs to the site
    const worker = await Worker.findOne({ _id: workerId, assignedSite: siteId });
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found or not assigned to this site' });
    }

    // Check if attendance already exists for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existingAttendance = await Attendance.findOne({
      worker: workerId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    // Create new attendance record
    const attendance = new Attendance({
      worker: workerId,
      site: siteId,
      date: new Date(),
      inTime: inTime,
      markedBy: req.user._id // From auth middleware
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error marking attendance', error: error.message });
  }
};

// Mark out time
exports.markOutTime = async (req, res) => {
  try {
    const { workerId } = req.body;
    const outTime = new Date();

    // Find today's attendance record
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const attendance = await Attendance.findOne({
      worker: workerId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (!attendance) {
      return res.status(404).json({ message: 'No attendance record found for today' });
    }

    if (attendance.outTime) {
      return res.status(400).json({ message: 'Out time already marked' });
    }

    attendance.outTime = outTime;
    await attendance.save();

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error marking out time', error: error.message });
  }
};

// Add attendance manually (for site managers)
exports.addAttendance = async (req, res) => {
  try {
    const { workerId, siteId, date, status, checkIn, checkOut } = req.body;
    
    if (!workerId || !siteId) {
      return res.status(400).json({ status: 'error', message: 'workerId and siteId are required' });
    }
    
    // Check if worker exists and belongs to the site
    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const site = await Site.findById(siteId);
    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }

    // Parse date string to Date object
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);
    
    // Check for existing attendance on the same date
    const existingAttendance = await Attendance.findOne({
      worker: workerId,
      date: {
        $gte: attendanceDate,
        $lt: new Date(attendanceDate.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingAttendance) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Attendance already exists for this worker on the selected date' 
      });
    }

    // Create new attendance record
    const attendance = new Attendance({
      worker: workerId,
      site: siteId,
      date: attendanceDate,
      status: status || 'present',
      markedBy: req.user._id
    });

    // Add check-in time if provided
    if (checkIn) {
      const [hours, minutes] = checkIn.split(':').map(Number);
      const inTime = new Date(attendanceDate);
      inTime.setHours(hours, minutes, 0, 0);
      attendance.inTime = inTime;
    }

    // Add check-out time if provided
    if (checkOut) {
      const [hours, minutes] = checkOut.split(':').map(Number);
      const outTime = new Date(attendanceDate);
      outTime.setHours(hours, minutes, 0, 0);
      attendance.outTime = outTime;
    }

    await attendance.save();
    
    res.status(201).json({
      status: 'success',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error adding attendance record', 
      error: error.message 
    });
  }
};

// Get attendance for a site
exports.getSiteAttendance = async (req, res) => {
  try {
    const { siteId } = req.params;
    const { date } = req.query;
    const query = { site: siteId };

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    const attendance = await Attendance.find(query)
      .populate('worker', 'name contact')
      .populate('markedBy', 'name')
      .sort({ date: -1 });

    res.json({
      status: 'success',
      data: {
        attendance
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error fetching attendance', 
      error: error.message 
    });
  }
};

// Get attendance for a specific date
exports.getDateAttendance = async (req, res) => {
  try {
    const { date } = req.params;
    
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() +
    1);
    
    const query = {
      date: { $gte: startDate, $lt: endDate }
    };

    const attendance = await Attendance.find(query)
      .populate('worker', 'name contact')
      .populate('site', 'name location')
      .populate('markedBy', 'name')
      .sort({ 'worker.name': 1 });

    res.json({
      status: 'success',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error fetching attendance', 
      error: error.message 
    });
  }
};

// Get attendance for a worker
exports.getWorkerAttendance = async (req, res) => {
  try {
    const { workerId } = req.params;
    const { startDate, endDate } = req.query;
    const query = { worker: workerId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(query)
      .populate('site', 'name')
      .populate('markedBy', 'name')
      .sort({ date: -1 });

    res.json({
      status: 'success',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error fetching attendance', 
      error: error.message 
    });
  }
};

// Update attendance record
exports.updateAttendance = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const { status, checkIn, checkOut } = req.body;
    
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      return res.status(404).json({
        status: 'error',
        message: 'Attendance record not found'
      });
    }
    
    // Update the status if provided
    if (status) {
      attendance.status = status;
    }
    
    // Update check-in time if provided
    if (checkIn) {
      const attendanceDate = new Date(attendance.date);
      const [hours, minutes] = checkIn.split(':').map(Number);
      const inTime = new Date(attendanceDate);
      inTime.setHours(hours, minutes, 0, 0);
      attendance.inTime = inTime;
    }
    
    // Update check-out time if provided
    if (checkOut) {
      const attendanceDate = new Date(attendance.date);
      const [hours, minutes] = checkOut.split(':').map(Number);
      const outTime = new Date(attendanceDate);
      outTime.setHours(hours, minutes, 0, 0);
      attendance.outTime = outTime;
    }
    
    await attendance.save();
    
    res.json({
      status: 'success',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating attendance record',
      error: error.message
    });
  }
};

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const { site, date, worker, verified } = req.query;
    const query = {};

    if (site) query.site = site;
    if (worker) query.worker = worker;
    
    // Date filtering
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    // Verification status filtering
    if (verified !== undefined) {
      query.verified = verified === 'true';
    }

    const attendance = await Attendance.find(query)
      .populate('worker', 'name contact')
      .populate('site', 'name location')
      .populate('markedBy', 'name')
      .populate('verifiedBy', 'name')
      .sort({ date: -1 });

    res.json({
      status: 'success',
      data: {
        attendance
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error fetching attendance records', 
      error: error.message 
    });
  }
};

// Get pending verification count for a site
exports.getPendingVerificationCount = async (req, res) => {
  try {
    const { site } = req.query;
    
    if (!site) {
      return res.status(400).json({
        status: 'error',
        message: 'Site ID is required'
      });
    }
    
    // Count attendance records that are submitted to incharge but not verified
    const count = await Attendance.countDocuments({
      site,
      submittedToIncharge: true,
      verified: false
    });
    
    res.json({
      status: 'success',
      count
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error getting pending verification count',
      error: error.message
    });
  }
};

// Verify attendance records
exports.verifyAttendance = async (req, res) => {
  try {
    const { attendanceIds, note } = req.body;
    
    if (!attendanceIds || !Array.isArray(attendanceIds) || attendanceIds.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No attendance records specified for verification'
      });
    }

    // Verify user is authorized (must be admin or site_incharge)
    if (req.user.role !== 'admin' && req.user.role !== 'site_incharge') {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to verify attendance records'
      });
    }

    // Update all attendance records
    const updateResult = await Attendance.updateMany(
      { _id: { $in: attendanceIds }, verified: false },
      { 
        $set: { 
          verified: true,
          verifiedBy: req.user._id,
          verifiedAt: new Date(),
          verificationNote: note || `Verified by ${req.user.name}`
        } 
      }
    );

    res.json({
      status: 'success',
      message: `${updateResult.modifiedCount} attendance records verified successfully`,
      modifiedCount: updateResult.modifiedCount
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error verifying attendance records',
      error: error.message
    });
  }
};

// Reject attendance records
exports.rejectAttendance = async (req, res) => {
  try {
    const { attendanceIds, note } = req.body;
    
    if (!attendanceIds || !Array.isArray(attendanceIds) || attendanceIds.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No attendance records specified for rejection'
      });
    }

    // Verify user is authorized (must be admin or site_incharge)
    if (req.user.role !== 'admin' && req.user.role !== 'site_incharge') {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to reject attendance records'
      });
    }

    // Find all specified attendance records and delete them
    const deleteResult = await Attendance.deleteMany({ _id: { $in: attendanceIds } });

    res.json({
      status: 'success',
      message: `${deleteResult.deletedCount} attendance records rejected and removed`,
      deletedCount: deleteResult.deletedCount,
      note: note || 'No rejection note provided'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error rejecting attendance records',
      error: error.message
    });
  }
};

// Modify attendance record (for site incharge)
exports.modifyAttendance = async (req, res) => {
  try {
    const { attendanceId, status, checkIn, checkOut, note } = req.body;
    
    // Verify user is authorized (must be admin or site_incharge)
    if (req.user.role !== 'admin' && req.user.role !== 'site_incharge') {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to modify attendance records'
      });
    }
    
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      return res.status(404).json({
        status: 'error',
        message: 'Attendance record not found'
      });
    }
    
    // Update the status if provided
    if (status) {
      attendance.status = status;
    }
    
    // Update check-in time if provided
    if (checkIn) {
      const attendanceDate = new Date(attendance.date);
      const [hours, minutes] = checkIn.split(':').map(Number);
      const inTime = new Date(attendanceDate);
      inTime.setHours(hours, minutes, 0, 0);
      attendance.inTime = inTime;
    }
    
    // Update check-out time if provided
    if (checkOut) {
      const attendanceDate = new Date(attendance.date);
      const [hours, minutes] = checkOut.split(':').map(Number);
      const outTime = new Date(attendanceDate);
      outTime.setHours(hours, minutes, 0, 0);
      attendance.outTime = outTime;
    }
    
    // Mark as verified by the site incharge
    attendance.verified = true;
    attendance.verifiedBy = req.user._id;
    attendance.verifiedAt = new Date();
    attendance.verificationNote = note || `Modified and verified by ${req.user.name}`;
    
    await attendance.save();
    
    res.json({
      status: 'success',
      message: 'Attendance record modified and verified successfully',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error modifying attendance record',
      error: error.message
    });
  }
};

// Get sites with attendance data for a specific date
exports.getSitesWithAttendance = async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        status: 'error',
        message: 'Date is required'
      });
    }
    
    // Parse date
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    
    // Get all sites
    const sites = await Site.find();
    
    // For each site, get attendance counts and submission details
    const sitesWithAttendance = await Promise.all(sites.map(async (site) => {
      // Count total attendance records for the site on the given date
      const attendanceCount = await Attendance.countDocuments({
        site: site._id,
        date: { $gte: startDate, $lt: endDate },
        submittedToIncharge: true
      });
      
      // Count verified attendance records
      const verifiedCount = await Attendance.countDocuments({
        site: site._id,
        date: { $gte: startDate, $lt: endDate },
        submittedToIncharge: true,
        verified: true
      });
      
      // Get submission timestamp if available
      const latestSubmission = await Attendance.findOne({
        site: site._id,
        date: { $gte: startDate, $lt: endDate },
        submittedToIncharge: true,
        submissionTimestamp: { $exists: true }
      }).sort({ submissionTimestamp: -1 });
      
      return {
        _id: site._id,
        name: site.name,
        location: site.location,
        attendanceCount,
        verifiedCount,
        submissionTimestamp: latestSubmission ? latestSubmission.submissionTimestamp : null
      };
    }));
    
    // Filter out sites with no attendance
    const filteredSites = sitesWithAttendance.filter(site => site.attendanceCount > 0);
    
    res.json({
      status: 'success',
      data: {
        sites: filteredSites
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error getting sites with attendance',
      error: error.message
    });
  }
}; 