const express = require('express');
const router = express.Router();
const sessionMiddleware = require('../middleware/sessionMiddleware')
const PatientController = require('../controllers/patientsController');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/register',sessionMiddleware,PatientController.register);
router.post('/login',sessionMiddleware,adminMiddleware,PatientController.login);
router.put('/update/:id',PatientController.update);
router.delete('/delete/:id',PatientController.delete);
// router.post('patients/logout',PatientController.logout);

module.exports = router;