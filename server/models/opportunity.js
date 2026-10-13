const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  opportunityName: { type: String, required: [true, 'Opportunity Name is required.'] },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function(v){ return v > 0; },
      message: 'Opportunity Amount must be greater than 0.'
    }
  },
  stage: { type: String, enum: ['Prospecting','Proposal','Negotiation','Closed Won','Closed Lost'], required: true },
  probability: {
    type: Number,
    required: true,
    min: [0, 'Probability must be between 0 and 100.'],
    max: [100, 'Probability must be between 0 and 100.']
  },
  expectedCloseDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v){
        // Cannot be in the past for active Opportunity
        if(this.status === 'Active' ||!this.status) {
          return v >= new Date().setHours(0,0,0,0);
        }
        return true;
      },
      message: 'Expected Close Date cannot be in the past.'
    }
  },
  status: { type: String, default: 'Active' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', opportunitySchema);