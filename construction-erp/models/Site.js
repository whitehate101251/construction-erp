const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  siteIncharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  siteManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  additionalForemen: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add a method to get all foremen for a site (including those under site incharge)
siteSchema.methods.getAllForemen = function() {
  let foremen = [];
  
  // Add primary site manager if exists
  if (this.siteManager) {
    foremen.push(this.siteManager);
  }
  
  // Add additional foremen
  if (this.additionalForemen && this.additionalForemen.length > 0) {
    foremen = foremen.concat(this.additionalForemen);
  }
  
  return foremen;
};

// Add a method to check if a user has access to this site
siteSchema.methods.hasAccess = function(userId) {
  // Convert userId to string for comparison
  const userIdStr = userId.toString();
  
  // Check if user is the site incharge
  if (this.siteIncharge && this.siteIncharge.toString() === userIdStr) {
    return true;
  }
  
  // Check if user is the primary site manager
  if (this.siteManager && this.siteManager.toString() === userIdStr) {
    return true;
  }
  
  // Check if user is in additional foremen
  if (this.additionalForemen && this.additionalForemen.some(id => id.toString() === userIdStr)) {
    return true;
  }
  
  return false;
};

module.exports = mongoose.model('Site', siteSchema); 