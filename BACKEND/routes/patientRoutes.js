const express = require('express');
const router = express.Router();
const {registerPatient,loginPatient} = require('../controllers/patientsController');
const jwtTokenMiddleware = require('../middleware/jwtTokenMiddleware')

router.post('/register',registerPatient);
router.post('/login',loginPatient);
router.get('/dashboard', jwtTokenMiddleware, (req, res) => {
    // The req.user contains user info extracted from the token
    const user = req.user;

});


// router.put('/update/:id',PatientController.update);
// router.delete('/delete/:id',PatientController.delete);
// // router.post('patients/logout',PatientController.logout);

module.exports = router;