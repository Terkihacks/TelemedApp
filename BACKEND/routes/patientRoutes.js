const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/patientsController');
const adminMiddleware = require('../middleware/adminMiddleware');
router.post('/register',PatientController.register);
router.post('/login',adminMiddleware,PatientController.login);
router.put('/update/:id',PatientController.update);
router.delete('/delete/:id',PatientController.delete);
// router.post('patients/logout',PatientController.logout);

module.exports = router;