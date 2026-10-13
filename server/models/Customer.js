const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerCode: { type: String, unique: true },
  customerName: {
    type: String,
    required: [true, 'Customer Name is required.'],
    maxlength: [100, 'Name: configured maximum length exceeded']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Enter a valid email address.']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required.'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Enter a valid phone number. 10-digit Indian mobile format.']
  },
  companyName: { type: String, required: true },
  address: String,
  city: String,
  state: String,
  status: { type: String, enum: ['Active','Inactive'], default: 'Active' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } });

// Duplicate prevent - Pre-save hook for CustomerCode auto
customerSchema.pre('save', async function(next){
  if(!this.customerCode){
    this.customerCode = 'CUST-' + Date.now();
  }
  next();
});

module.exports = mongoose.model('Customer', customerSchema);