const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const app = express();
const{createAppointment,getAppointment,  updateAppointment,deleteAppointment} = require('../controllers/appointmentController');
const router =  express.Router;

router.post('/appointment',adminMiddleware,createAppointment);
router.get('/appointment/:id',adminMiddleware,getAppointment);
router.put('/appointments/:id', appointmentController.updateAppointment);
router.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports = router;