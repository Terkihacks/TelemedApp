const express = require('express');
const router = express.Router();
const {createDoctor,loginDoctor,getDocById} = require('../controllers/doctorsController');
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
router.get('/doctors/:id', getDocById);
// router.get('/doctors', doctorController.getAllDoctors);
// router.put('/doctors/:id', doctorController.updateDoctor);
// router.delete('/doctors/:id', doctorController.deleteDoctor);

module.exports = router;


