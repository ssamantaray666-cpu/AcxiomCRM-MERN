const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, enum: ['Login','Failed Login','Create','Update','Delete','Role Change'], required: true },
  entityName: String,
  recordId: String,
  oldValue: mongoose.Schema.Types.Mixed,
  newValue: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditSchema);