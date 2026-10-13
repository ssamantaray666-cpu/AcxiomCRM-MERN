const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  leadCode: { type: String, unique: true },
  leadName: { type: String, required: [true, 'Lead name is mandatory.'] },
  email: { type: String, match: [/^\S+@\S+\.\S+$/, 'Enter a valid email address.'] },
  phone: { type: String, match: [/^[6-9]\d{9}$/, 'Enter a valid phone number.'] },
  companyName: String,
  source: { type: String, enum: ['Website','Referral','ColdCall','Advertisement','Other'] },
  status: { type: String, enum: ['New','Contacted','Qualified','Lost','Converted'], required: true, default: 'New' },
  expectedValue: { type: Number, min: 0 },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdDate: { type: Date, default: Date.now }
});

leadSchema.pre('save', function(next){
  if(!this.leadCode) this.leadCode = 'LEAD-' + Date.now();
  next();
});

module.exports = mongoose.model('Lead', leadSchema);