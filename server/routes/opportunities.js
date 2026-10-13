const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');
const { protect } = require('../middleware/Auth');

router.get('/', protect, async (req,res)=>{
  const data = await Opportunity.find();
  res.json(data);
});

router.post('/', protect, async (req,res)=>{
  try{
    const opp = await Opportunity.create(req.body);
    res.status(201).json(opp);
  }catch(e){
    res.status(400).json({msg: e.message}); // Amount>0, Probability 0-100, Date past error asbe
  }
});

module.exports = router;