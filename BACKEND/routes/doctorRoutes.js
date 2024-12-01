const express = require('express');
const router = express.Router();
const {createDoctor,loginDoctor,getDocProfile, updateProfile,deleteById} = require('../controllers/doctorsController');
const doctorMiddleware = require('../middleware/doctorMiddleware')

router.post('/register', createDoctor);
router.post('/login',loginDoctor);
router.get('/docdashboard',doctorMiddleware,(req,res) =>{
    const user = req.user;
    res.json({
        message:'Doc dashboard',
        user:{
            id:user.id,
            email:user.email,
            first_name:user.first_name
        }
    })
});
router.get('/profile/id',doctorMiddleware,getDocProfile)
router.put('/updateprofile',doctorMiddleware,updateProfile)
router.delete('/deleteprofile',doctorMiddleware,deleteById);

module.exports = router;


