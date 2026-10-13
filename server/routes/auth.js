const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req,res)=>{
  const {name,email,password,role} = req.body;
  const hash = await bcrypt.hash(password, 10);
  try{
    const user = await User.create({name,email,passwordHash:hash,role});
    res.json(user);
  }catch(e){ res.status(400).json({msg: e.message}); }
});

// POST /api/auth/login - with lockout logic PDF 6.3
router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({msg:'Invalid credentials'});
  if(user.lockoutEnd && user.lockoutEnd > Date.now()){
    return res.status(403).json({msg:'Account locked for 15 min'});
  }
  const ok = await user.comparePassword(password);
  if(!ok){
    user.failedLoginCount += 1;
    if(user.failedLoginCount >= 5) user.lockoutEnd = new Date(Date.now()+15*60*1000);
    await user.save();
    return res.status(400).json({msg:'Invalid credentials'});
  }
  user.failedLoginCount = 0; await user.save();
  const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET);
  res.json({token, role:user.role});
});

module.exports = router;