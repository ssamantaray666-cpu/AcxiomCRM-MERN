const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { protect, authorize } = require('../middleware/Auth');

// GET /api/customers - Protected
router.get('/', protect, async (req,res)=>{
  const customers = await Customer.find().populate('ownerId','name');
  res.json(customers);
});

// POST /api/customers - Server-side validation
router.post('/', protect, async (req,res)=>{
  try{
    // Duplicate check
    const exists = await Customer.findOne({ $or: [{email: req.body.email}, {phone: req.body.phone}] });
    if(exists) return res.status(400).json({msg: 'Duplicate customer - Email/Phone already exists'});
    
    const cust = await Customer.create({...req.body, ownerId: req.user.id, createdBy: req.user.id});
    res.status(201).json(cust);
  }catch(e){
    res.status(400).json({msg: e.message});
  }
});

module.exports = router;