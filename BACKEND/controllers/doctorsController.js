// controllers/DoctorController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
    // CREATE: Add a new doctor
    exports.createDoctor = async(req,res) =>{
        try{
            const{first_name,last_name,specialization,email,phone,schedule,password} = req.body || null;
            const [rows] = await db.execute('SELECT * FROM doctors WHERE email = ?',[email]);
            if (rows.length > 0){
                return res.status(400).json({message:'Email already exists,register for a new Doctor Account'}); }
            
                const hashedPassword = await bcrypt.hash(password,10);
                await db.execute('INSERT INTO doctors(first_name,last_name,specialization,email,phone,schedule,password) VALUES(?,?,?,?,?,?,?)',
                    [first_name,last_name,specialization,email,phone,schedule,hashedPassword]);
                    res.status(200).json({message: 'Doctors Account created successfully'})
           
        }catch(error){
            console.log(error);
            console.error('Registration error:', error.message || error);
            res.status(500).json({ message: 'Error registering patient account', error });
        }
    }

    exports.loginDoctor = async(req,res) =>{
        try{
        
            const{email,password} = req.body || null;
            const[rows] =  await db.execute('SELECT * FROM doctors WHERE email = ?',[email]);
            if(rows.length === 0){
                return res.status(400).json({message:"User found,register for a new one"})
            }
            const doc = rows[0];
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({message:"Invalid Credentials"});
            }
            else{
                //Generate a token
                const token = jwt.sign(
                    {
                        email:doc.email,
                        first_name:doc.first_name
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn:'1hr'
                    }
                )
                res.status(200).json({ message: 'Login successful', token });
            }           
        }catch(error){
            console.log(error);
            res.status(500).json({ message: 'Error logging in Patient', error });
        }
    }
    // // READ: Get a specific doctor by ID
    // static async getDoctorById(req, res) {
    //     try {
    //         const doctorId = req.params.id;
    //         const doctor = await Doctor.findById(doctorId);
    //         res.status(200).json(doctor);
    //     } catch (error) {
    //         console.error('Error retrieving doctor:', error);
    //         res.status(404).json({ message: 'Doctor not found' });
    //     }
    // }

    // // READ: Get all doctors
    // static async getAllDoctors(req, res) {
    //     try {
    //         const doctors = await Doctor.findAll();
    //         res.status(200).json(doctors);
    //     } catch (error) {
    //         console.error('Error retrieving doctors:', error);
    //         res.status(500).json({ message: 'Could not retrieve doctors' });
    //     }
    // }

    // // UPDATE: Update a doctor's profile or schedule
    // static async updateDoctor(req, res) {
    //     try {
    //         const doctorId = req.params.id;
    //         const doctorData = req.body;
    //         await Doctor.update(doctorId, doctorData);
    //         res.status(200).json({ message: 'Doctor updated successfully' });
    //     } catch (error) {
    //         console.error('Error updating doctor:', error);
    //         res.status(500).json({ message: 'Could not update doctor' });
    //     }
    // }

    // // DELETE: Deactivate or delete a doctor profile
    // static async deleteDoctor(req, res) {
    //     try {
    //         const doctorId = req.params.id;
    //         await Doctor.delete(doctorId);
    //         res.status(200).json({ message: 'Doctor deleted successfully' });
    //     } catch (error) {
    //         console.error('Error deleting doctor:', error);
    //         res.status(500).json({ message: 'Could not delete doctor' });
    //     }
    // }

