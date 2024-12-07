const express = require('express');
const router = express.Router();
const {registerPatient,loginPatient,updatePatient,LogoutUser} = require('../controllers/patientsController');
const jwtTokenMiddleware = require('../middleware/jwtTokenMiddleware')

router.post('/register',registerPatient);
router.post('/login',loginPatient);
router.get('/dashboard', jwtTokenMiddleware, (req, res) => {
    // The req.user contains user info extracted from the token
    const user = req.user;
    res.json({
        message:"Welcome to your dashboard",
        user:{
            id:user.id,
            email:user.email,
            first_name:user.first_name,
        }
    })
});
router.put('/updateProf/id',jwtTokenMiddleware,updatePatient);
router.post('/logout',jwtTokenMiddleware,LogoutUser)

module.exports = router;