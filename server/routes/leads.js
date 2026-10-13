const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { protect } = require('../middleware/Auth');

router.get('/', protect, async (req,res)=> res.json(await Lead.find()));
router.post('/', protect, async (req,res)=>{
  try{ res.json(await Lead.create(req.body)); }
  catch(e){ res.status(400).json({msg: e.message}); }
});

module.exports = router;