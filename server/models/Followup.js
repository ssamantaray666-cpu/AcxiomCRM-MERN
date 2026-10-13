const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  followUpDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v){
        return v >= new Date().setHours(0,0,0,0);
      },
      message: 'Follow-up date cannot be earlier than today.'
    }
  },
  followUpType: { type: String, enum: ['Call','Meeting','Email','Other'], required: true },
  remarks: { type: String, required: true },
  status: { type: String, enum: ['Planned','Completed','Cancelled'], default: 'Planned' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('FollowUp', followUpSchema);