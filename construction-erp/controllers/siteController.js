const Site = require('../models/Site');
const User = require('../models/User');
const AppError = require('../utils/AppError');

// Create new site
exports.createSite = async (req, res, next) => {
  try {
    const { name, location, siteManager, siteIncharge } = req.body;

    console.log('Creating site with manager ID:', siteManager);

    // Check if the site manager exists and has the correct role
    const manager = await User.findOne({ _id: siteManager, role: 'site_manager' });
    
    if (!manager) {
      console.error('Site manager not found with ID:', siteManager);
      return res.status(400).json({
        status: 'error',
        message: 'Site manager not found'
      });
    }
    
    // If site incharge is provided, check if valid
    let validatedIncharge = null;
    if (siteIncharge) {
      validatedIncharge = await User.findOne({ _id: siteIncharge, role: 'site_incharge' });
      if (!validatedIncharge) {
        return res.status(400).json({
          status: 'error',
          message: 'Site incharge not found or not a valid incharge'
        });
      }
    }
    
    const siteData = {
      name,
      location,
      siteManager,
      siteIncharge: validatedIncharge ? siteIncharge : null
    };
    
    const site = await Site.create(siteData);

    // Populate the references for the response
    const populatedSite = await Site.findById(site._id)
      .populate('siteManager', 'name email phone')
      .populate('siteIncharge', 'name email phone')
      .populate('additionalForemen', 'name email phone');

    res.status(201).json({
      status: 'success',
      data: { site: populatedSite }
    });
  } catch (error) {
    console.error('Error creating site:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error creating site: ' + error.message
    });
  }
};

// Get all sites with proper access control
exports.getAllSites = async (req, res, next) => {
  try {
    const user = req.user;
    let query = {};
    
    // If user is not admin, filter sites based on role and access
    if (user.role !== 'admin') {
      if (user.role === 'site_incharge') {
        // Site incharge can see their assigned sites
        query = { siteIncharge: user._id };
      } else if (user.role === 'site_manager') {
        // Foremen can see sites where they are either:
        // 1. The primary site manager
        // 2. In additional foremen
        // 3. Under a site incharge who manages the site
        query = {
          $or: [
            { siteManager: user._id },
            { additionalForemen: user._id },
            { siteIncharge: user._id }
          ]
        };
      }
    }
    
    const sites = await Site.find(query)
      .populate('siteManager', 'name email phone')
      .populate('siteIncharge', 'name email phone')
      .populate('additionalForemen', 'name email phone');
    
    res.status(200).json({
      status: 'success',
      data: { sites }
    });
  } catch (error) {
    console.error('Error getting sites:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error getting sites: ' + error.message
    });
  }
};

// Get site by ID
exports.getSite = async (req, res, next) => {
  try {
    const site = await Site.findById(req.params.id)
      .populate('siteManager', 'name email')
      .populate('siteIncharge', 'name email')
      .populate('additionalForemen', 'name email');

    if (!site) {
      throw new AppError('Site not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { site }
    });
  } catch (error) {
    next(error);
  }
};

// Update site status
exports.updateSiteStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const site = await Site.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
    .populate('siteManager', 'name email')
    .populate('siteIncharge', 'name email');

    if (!site) {
      throw new AppError('Site not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: { site }
    });
  } catch (error) {
    next(error);
  }
};

// Get sites by manager
exports.getSitesByManager = async (req, res, next) => {
  try {
    const sites = await Site.find({ siteManager: req.params.managerId })
      .populate('siteManager', 'name email')
      .populate('siteIncharge', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      data: { sites }
    });
  } catch (error) {
    next(error);
  }
};

// Get sites with attendance data
exports.getSitesWithAttendance = async (req, res, next) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        status: 'error',
        message: 'Date parameter is required'
      });
    }
    
    // Get all sites
    const sites = await Site.find()
      .populate('siteManager', 'name email')
      .populate('siteIncharge', 'name email')
      .populate('additionalForemen', 'name email')
      .sort({ name: 1 });
    
    // Get attendance counts for each site on the given date
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Get attendance data for all sites
    const Attendance = require('../models/Attendance');
    
    // Create a site result array with attendance data
    const sitesWithAttendance = await Promise.all(sites.map(async (site) => {
      // Count total attendance records for this site on the given date
      const attendanceCount = await Attendance.countDocuments({
        site: site._id,
        date: { $gte: selectedDate, $lt: nextDay }
      });
      
      // Count verified attendance records
      const verifiedCount = await Attendance.countDocuments({
        site: site._id,
        date: { $gte: selectedDate, $lt: nextDay },
        verified: true
      });
      
      return {
        _id: site._id,
        name: site.name,
        location: site.location,
        siteManager: site.siteManager,
        siteIncharge: site.siteIncharge,
        additionalForemen: site.additionalForemen,
        status: site.status,
        attendanceCount,
        verifiedCount
      };
    }));
    
    // Filter out sites with no attendance
    const sitesWithData = sitesWithAttendance.filter(site => site.attendanceCount > 0);
    
    res.status(200).json({
      status: 'success',
      data: { 
        sites: sitesWithData,
        date: selectedDate
      }
    });
  } catch (error) {
    console.error('Error fetching sites with attendance:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching sites with attendance data',
      error: error.message
    });
  }
};

// Update site details
exports.updateSite = async (req, res, next) => {
  try {
    console.log('Updating site with ID:', req.params.id);
    console.log('Update data:', req.body);
    
    const { name, location, siteManager, siteIncharge } = req.body;
    const updateData = {};
    
    // Only include fields that are provided and valid
    if (name) updateData.name = name;
    if (location) updateData.location = location;
    
    // If site manager is provided, verify it exists
    if (siteManager) {
      const manager = await User.findOne({ 
        _id: siteManager, 
        role: 'site_manager'
      });
      
      if (!manager) {
        return res.status(400).json({
          status: 'error',
          message: 'Site manager not found'
        });
      }
      
      // Check if the manager is already assigned to another site
      const existingSite = await Site.findOne({ 
        siteManager, 
        status: 'active',
        _id: { $ne: req.params.id } // Exclude current site
      });
      
      if (existingSite) {
        console.error('Site manager already assigned to site:', existingSite.name);
        return res.status(400).json({
          status: 'error',
          message: `This manager is already assigned to site "${existingSite.name}"`
        });
      }
      
      updateData.siteManager = siteManager;
    }
    
    // If site incharge is provided, verify it exists
    if (siteIncharge) {
      const incharge = await User.findOne({ 
        _id: siteIncharge, 
        role: 'site_incharge'
      });
      
      if (!incharge) {
        return res.status(400).json({
          status: 'error',
          message: 'Site incharge not found or not a valid incharge'
        });
      }
      
      updateData.siteIncharge = siteIncharge;
    }
    
    const site = await Site.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('siteManager', 'name email')
    .populate('siteIncharge', 'name email');
    
    if (!site) {
      return res.status(404).json({
        status: 'error',
        message: 'Site not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: { site }
    });
  } catch (error) {
    console.error('Error updating site:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating site: ' + error.message
    });
  }
};

// Delete site
exports.deleteSite = async (req, res, next) => {
  try {
    console.log('Deleting site with ID:', req.params.id);
    
    // Check if site exists
    const site = await Site.findById(req.params.id);
    
    if (!site) {
      return res.status(404).json({
        status: 'error',
        message: 'Site not found'
      });
    }
    
    // Delete the site
    await Site.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      status: 'success',
      message: 'Site deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting site:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting site: ' + error.message
    });
  }
};

// Add foremen to site
exports.addForemenToSite = async (req, res, next) => {
  try {
    console.log('Adding foremen to site with ID:', req.params.id);
    console.log('Foremen data:', req.body);
    
    const { foremenId } = req.body;
    
    if (!foremenId) {
      return res.status(400).json({
        status: 'error',
        message: 'Foremen ID is required'
      });
    }
    
    // Check if site exists
    const site = await Site.findById(req.params.id)
      .populate('siteIncharge', 'name email')
      .populate('siteManager', 'name email')
      .populate('additionalForemen', 'name email');
    
    if (!site) {
      return res.status(404).json({
        status: 'error',
        message: 'Site not found'
      });
    }
    
    // Check if the foremen exists
    const foremen = await User.findOne({ 
      _id: foremenId, 
      role: 'site_manager' 
    });
    
    if (!foremen) {
      return res.status(404).json({
        status: 'error',
        message: 'Foremen not found'
      });
    }
    
    // Check if foremen is already the primary site manager
    if (site.siteManager && site.siteManager._id.toString() === foremenId) {
      return res.status(400).json({
        status: 'error',
        message: 'This foremen is already the primary site manager'
      });
    }
    
    // Check if foremen is already in the additionalForemen array
    if (site.additionalForemen && site.additionalForemen.some(f => f._id.toString() === foremenId)) {
      return res.status(400).json({
        status: 'error',
        message: 'This foremen is already assigned to the site'
      });
    }
    
    // If site has no primary manager, make this foreman the primary manager
    if (!site.siteManager) {
      site.siteManager = foremenId;
    } else {
      // Add the foremen to the additionalForemen array
      site.additionalForemen = site.additionalForemen || [];
      site.additionalForemen.push(foremenId);
    }
    
    await site.save();
    
    // Get the updated site with populated fields
    const updatedSite = await Site.findById(req.params.id)
      .populate('siteManager', 'name email')
      .populate('siteIncharge', 'name email')
      .populate('additionalForemen', 'name email');
    
    res.status(200).json({
      status: 'success',
      data: { site: updatedSite },
      message: 'Foremen added successfully'
    });
  } catch (error) {
    console.error('Error adding foremen to site:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error adding foremen to site: ' + error.message
    });
  }
};

// Remove foremen from site
exports.removeForemenFromSite = async (req, res, next) => {
  try {
    const siteId = req.params.id;
    const foremenId = req.params.foremenId;
    
    console.log(`Removing foremen ${foremenId} from site ${siteId}`);
    
    // Check if site exists
    const site = await Site.findById(siteId)
      .populate('siteIncharge', 'name email')
      .populate('siteManager', 'name email')
      .populate('additionalForemen', 'name email');
    
    if (!site) {
      return res.status(404).json({
        status: 'error',
        message: 'Site not found'
      });
    }
    
    let message = '';
    
    // Check if foremen is the primary site manager
    if (site.siteManager && site.siteManager._id.toString() === foremenId) {
      // Update the site to remove the primary manager
      site.siteManager = null;
      message = 'Primary foremen removed from site successfully';
    } 
    // Check if foremen is in the additionalForemen array
    else if (site.additionalForemen && site.additionalForemen.some(f => f._id.toString() === foremenId)) {
      // Remove the foremen from additionalForemen array
      site.additionalForemen = site.additionalForemen.filter(f => f._id.toString() !== foremenId);
      message = 'Foremen removed from site successfully';
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Foremen not found in site'
      });
    }
    
    await site.save();
    
    // Get the updated site with populated fields
    const updatedSite = await Site.findById(siteId)
      .populate('siteManager', 'name email')
      .populate('siteIncharge', 'name email')
      .populate('additionalForemen', 'name email');
    
    res.status(200).json({
      status: 'success',
      data: { site: updatedSite },
      message
    });
  } catch (error) {
    console.error('Error removing foremen from site:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error removing foremen from site: ' + error.message
    });
  }
}; 