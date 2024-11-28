const express = require('express');
const jwtTokenMiddleware = require('../middleware/jwtTokenMiddleware')
const{createAppointment,getAppointment} = require('../controllers/appointmentController');
const router =  express.Router();

router.post('/appointment',jwtTokenMiddleware,createAppointment);
router.get('/getappointments',jwtTokenMiddleware,getAppointment);
// router.put('/appointments/:id',adminMiddleware, updateAppointment);
// router.delete('/appointments/:id',adminMiddleware,deleteAppointment);

module.exports = router;