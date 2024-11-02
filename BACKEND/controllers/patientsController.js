//Import Packages
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const Patient = require('../models/Patient');
// const sessionMiddleware = require('../middleware/sessionMiddleware')

class PatientController {
    // Register a new patient
    static async register(req, res){
      try {
        // Fetch the data from the frontend
        const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
        console.log(req.body); // Log the incoming request body
        // Check if a user already exists with the given email
        const existingPatient = await Patient.findByEmail(email);
        if (existingPatient) {
          return res.status(400).json({ message: 'Email already exists,register for a new Account' });
        }
  
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new patient in the database
        const patientData = { first_name, last_name, email, password_hash: hashedPassword, phone, date_of_birth, gender, address };
        const newPatientId = await Patient.create(patientData);
  
        // Return success message
        res.status(200).json({ message: 'Patient account registered successfully', patientId: newPatientId });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error registering patient account', error });
      }
    }
  
    // Login patient
    static async login(req, res) {
      try {
        const { email, password } = req.body;
  
        // Check if the patient exists by email
        const patient = await Patient.findByEmail(email);
        if (!patient) {
          return res.status(400).json({ message: 'Email does not exist' });
        }
  
        // Compare the submitted password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, patient.password_hash);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
  
        res.status(200).json({ message: 'Patient logged in successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in', error });
      }
    }
  
    // Update patient profile
    static async update(req, res) {
      try {
        const { id, first_name, last_name, phone, date_of_birth, gender, address } = req.body;
  
        // Check if the patient exists
        const patient = await Patient.findById(id);
        if (!patient) {
          return res.status(400).json({ message: 'Patient does not exist' });
        }
  
        // Update the patient data (but not email or password_hash)
        const updatedData = { first_name, last_name, phone, date_of_birth, gender, address };
        await Patient.update(id, updatedData);
  
        res.status(200).json({ message: 'Patient profile updated successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating patient profile', error });
      }
    }
  
    // Delete patient account
    static async delete(req, res) {
      try {
        const { id } = req.body;
        // Check if the patient exists
        const patient = await Patient.findById(id);
        if (!patient) {
          return res.status(400).json({ message: 'Patient does not exist' });
        }
  
        // Delete the patient
        await Patient.delete(id);
  
        res.status(200).json({ message: 'Patient account deleted successfully' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting patient account', error });
      }
    }

     //A logout Method

     static async logout(req,res){
     //Destroy session
     req.session.destroy(err => {
      if (err) {
          return res.status(500).json({ message: 'Could not log out' });
      }
      res.status(200).json({ message: 'Logout successful' });
  });
     }

  }
    //Export the controller
module.exports = PatientController;