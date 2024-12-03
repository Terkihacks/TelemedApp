// module.exports = router;
const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/adminMiddleware')
const { createAdmin, loginAdmin,deleteAdmin } = require('../controllers/adminController');

// Apply the middleware to the routes that require admin access
router.post('/register', createAdmin);
router.post('/login',loginAdmin)
router.get('/admindashboard',verifyRoles(['Admin','Moderator']),(req,res) =>{
    const admin = req.user;
    res.json({
        message:'Admin dashboard',
        admin:{
            id:admin.id,
            username:admin.username,
            role:admin.role
        }
    })

});
router.delete('/deleteprofile', deleteAdmin);

module.exports = router;