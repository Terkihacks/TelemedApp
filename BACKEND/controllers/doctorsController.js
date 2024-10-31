// controllers/DoctorController.js
const Doctor = require('../models/Doctor');

class doctorController {
    // CREATE: Add a new doctor
    static async createDoctor(req, res) {
        try {
            const doctorData = req.body;
            const doctorId = await Doctor.create(doctorData);
            res.status(201).json({ message: 'Doctor created successfully', doctorId });
        } catch (error) {
            console.error('Error creating doctor:', error);
            res.status(500).json({ message: 'Could not create doctor' });
        }
    }

    // READ: Get a specific doctor by ID
    static async getDoctorById(req, res) {
        try {
            const doctorId = req.params.id;
            const doctor = await Doctor.findById(doctorId);
            res.status(200).json(doctor);
        } catch (error) {
            console.error('Error retrieving doctor:', error);
            res.status(404).json({ message: 'Doctor not found' });
        }
    }

    // READ: Get all doctors
    static async getAllDoctors(req, res) {
        try {
            const doctors = await Doctor.findAll();
            res.status(200).json(doctors);
        } catch (error) {
            console.error('Error retrieving doctors:', error);
            res.status(500).json({ message: 'Could not retrieve doctors' });
        }
    }

    // UPDATE: Update a doctor's profile or schedule
    static async updateDoctor(req, res) {
        try {
            const doctorId = req.params.id;
            const doctorData = req.body;
            await Doctor.update(doctorId, doctorData);
            res.status(200).json({ message: 'Doctor updated successfully' });
        } catch (error) {
            console.error('Error updating doctor:', error);
            res.status(500).json({ message: 'Could not update doctor' });
        }
    }

    // DELETE: Deactivate or delete a doctor profile
    static async deleteDoctor(req, res) {
        try {
            const doctorId = req.params.id;
            await Doctor.delete(doctorId);
            res.status(200).json({ message: 'Doctor deleted successfully' });
        } catch (error) {
            console.error('Error deleting doctor:', error);
            res.status(500).json({ message: 'Could not delete doctor' });
        }
    }
}

module.exports = doctorController;
