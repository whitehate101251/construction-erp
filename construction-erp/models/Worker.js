const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  fatherName: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },
  contact: {
    phone: {
      type: String,
      required: false,
      trim: true,
      default: ''
    },
    address: {
      type: String,
      trim: true,
      default: ''
    }
  },
  role: {
    type: String,
    required: false,
    enum: ['mason', 'carpenter', 'electrician', 'plumber', 'laborer'],
    trim: true,
    default: 'laborer'
  },
  assignedSite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: false,
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Worker', workerSchema); 