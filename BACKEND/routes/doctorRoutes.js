const express = require('express');
const router = express.Router();
const {createDoctor,loginDoctor,getDocById} = require('../controllers/doctorsController');

router.post('/register', createDoctor);
router.post('/login',loginDoctor)
router.get('/doctors/:id', getDocById);
// router.get('/doctors', doctorController.getAllDoctors);
// router.put('/doctors/:id', doctorController.updateDoctor);
// router.delete('/doctors/:id', doctorController.deleteDoctor);

module.exports = router;


