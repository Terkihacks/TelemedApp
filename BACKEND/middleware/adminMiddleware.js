// middleware/adminMiddleware.js
const jwt = require('jsonwebtoken')

const VerifyRole = (requiredRoles) =>(req,res,next) => {
      const authHeaders = req.headers['authorization'];
      const token = authHeaders && authHeaders.split(' ')[1];
      if(!token) return res.status(403).json({message: 'Token required'});
      
      jwt.verify(token,process.env.SECRET_KEY,(err,user) =>{
        if(err) return res.status(403).json({message:'Invalid Token'});
        req.user = user
      //Check if the user role is allowed 
      if (!requiredRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access Denied' });
      }
      next();
    });
}

module.exports = VerifyRole;