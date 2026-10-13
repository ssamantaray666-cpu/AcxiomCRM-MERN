const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['Admin','Manager','SalesExecutive'], default: 'SalesExecutive' },
  isActive: { type: Boolean, default: true },
  failedLoginCount: { type: Number, default: 0 },
  lockoutEnd: { type: Date, default: null }
}, { timestamps: true });

// Password hashing - Never store plain text [PDF 6.1]
userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);