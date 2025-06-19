const Worker = require('../models/Worker');
const Site = require('../models/Site');

// Get all workers
exports.getAllWorkers = async (req, res) => {
  try {
    const { site } = req.query;
    let query = {};
    
    if (site) {
      query.assignedSite = site;
    }
    
    const workers = await Worker.find(query)
      .populate('assignedSite', 'name location')
      .sort({ name: 1 });
    
    console.log(`Returning ${workers.length} workers`);
    
    res.json({
      status: 'success',
      data: workers
    });
  } catch (error) {
    console.error('Error fetching workers:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching workers',
      error: error.message
    });
  }
};

// Get worker by ID
exports.getWorkerById = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id)
      .populate('assignedSite', 'name location');
    
    if (!worker) {
      return res.status(404).json({
        status: 'error',
        message: 'Worker not found'
      });
    }
    
    res.json({
      status: 'success',
      data: worker
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching worker',
      error: error.message
    });
  }
};

// Create new worker
exports.createWorker = async (req, res) => {
  try {
    const { name, fatherName, phone, site, role = 'laborer' } = req.body;
    
    // Validate required fields - only name is required now
    if (!name) {
      return res.status(400).json({
        status: 'error',
        message: 'Name is required'
      });
    }
    
    // Create worker with optional fields
    const worker = new Worker({
      name,
      fatherName: fatherName || '',
      contact: {
        phone: phone || '',
        address: req.body.address || ''
      },
      role,
      assignedSite: site || null,
      status: 'active'
    });
    
    await worker.save();
    
    res.status(201).json({
      status: 'success',
      data: worker
    });
  } catch (error) {
    console.error('Error creating worker:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error creating worker: ' + error.message
    });
  }
};

// Update worker
exports.updateWorker = async (req, res) => {
  try {
    const { name, fatherName, phone, site, role, status } = req.body;
    
    // Find worker
    const worker = await Worker.findById(req.params.id);
    
    if (!worker) {
      return res.status(404).json({
        status: 'error',
        message: 'Worker not found'
      });
    }

    // Update fields if provided
    if (name) worker.name = name;
    if (fatherName !== undefined) worker.fatherName = fatherName;
    if (phone !== undefined) worker.contact.phone = phone;
    if (req.body.address !== undefined) worker.contact.address = req.body.address;
    if (role) worker.role = role;
    if (site !== undefined) worker.assignedSite = site || null;
    if (status) worker.status = status;
    
    await worker.save();
    
    res.json({
      status: 'success',
      data: worker
    });
  } catch (error) {
    console.error('Error updating worker:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating worker: ' + error.message
    });
  }
};

// Delete worker
exports.deleteWorker = async (req, res) => {
  try {
    // Find and delete the worker
    const worker = await Worker.findByIdAndDelete(req.params.id);
    
    if (!worker) {
      return res.status(404).json({
        status: 'error',
        message: 'Worker not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Worker deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting worker:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting worker: ' + error.message
    });
  }
};

// Get workers count for dashboard
exports.getWorkersCount = async (req, res, next) => {
  try {
    const count = await Worker.countDocuments();
    
    res.status(200).json({
      status: 'success',
      count: count
    });
  } catch (error) {
    console.error('Error counting workers:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to count workers'
    });
  }
}; 