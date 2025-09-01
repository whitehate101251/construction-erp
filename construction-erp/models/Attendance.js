const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required: true
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    default: 'present'
  },
  inTime: {
    type: Date,
    required: function () {
      // inTime is only required if status is present or late
      return this.status === 'present' || this.status === 'late';
    }
  },
  outTime: {
    type: Date
  },
  hajiriX: {
    type: Number,
    default: 0,
    min: 0
  },
  hajiriY: {
    type: Number,
    default: 0,
    min: 0
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  verificationNote: {
    type: String
  },
  submittedToIncharge: {
    type: Boolean,
    default: false
  },
  submissionTimestamp: {
    type: Date
  },
  globalInTime: {
    type: Date
  },
  globalOutTime: {
    type: Date
  }
});

// Compound index to ensure unique attendance records per worker per day
attendanceSchema.index({ worker: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
