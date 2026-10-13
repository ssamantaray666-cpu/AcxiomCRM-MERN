const jwt = require('jsonwebtoken');

exports.protect = (req,res,next)=>{
  let token = req.headers.authorization;
  if(!token) return res.status(401).json({msg: 'Not authorized, protected CRM pages must not be accessible'});
  try{
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'acxiomsecret');
    req.user = decoded;
    next();
  }catch(e){
    return res.status(401).json({msg: 'Token failed'});
  }
};

exports.authorize = (...roles) => {
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return res.status(403).json({msg: 'Users cannot access unauthorized pages'});
    }
    next();
  }
};