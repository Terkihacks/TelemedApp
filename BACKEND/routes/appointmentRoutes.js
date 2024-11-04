const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const{createAppointment,getAppointment,updateAppointment,deleteAppointment} = require('../controllers/appointmentController');
const router =  express.Router();

router.post('/appointment',adminMiddleware,createAppointment);
router.get('/appointment/:id',adminMiddleware,getAppointment);
router.put('/appointments/:id',adminMiddleware, updateAppointment);
router.delete('/appointments/:id',adminMiddleware,deleteAppointment);

module.exports = router;