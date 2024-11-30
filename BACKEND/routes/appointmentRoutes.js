const express = require('express');
const jwtTokenMiddleware = require('../middleware/jwtTokenMiddleware')
const doctorMiddleware = require('../middleware/doctorMiddleware')
const{createAppointment,getAppointment,getdocAppointment} = require('../controllers/appointmentController');
const router =  express.Router();

router.post('/appointment',jwtTokenMiddleware,createAppointment);
router.get('/getappointments',jwtTokenMiddleware,getAppointment);
router.get('/getdocAppointment',doctorMiddleware,getdocAppointment)
// router.put('/appointments/:id',adminMiddleware, updateAppointment);
// router.delete('/appointments/:id',adminMiddleware,deleteAppointment);

module.exports = router;