//Import Packages
const db = require('../config/db');
async function createAppointment(req,res){
    //Fetch info from the request body and perform the http requests
    const {patient_id,doctor_id,appointment_date,appointment_time,status} = req.body;
     // Catch errors
     try{
     //Join the tables patients and doctors to obtain the patient_id and doctor_id
     const joinQuery = `
     SELECT p.id AS patient_id,
            d.id AS doctor_id,
     FROM patients p
     IINER JOIN Doctors d ON p.id = ? AND d.id = ?
     `
     //Perform join query
     const [rows] = await db.execute(joinQuery,[patientId,doctorId]);
     // If no matching rows are found, return an error
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Patient or Doctor not found' });
    }
     //Write queries to insert the data to the database if the doctor and the patient exist
     const insertQuery = `
     INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status, created_at)
     VALUES (?, ?, ?, ?, 'Scheduled', NOW());
     `;
     await db.execute(insertQuery, [patientId, doctorId, appointmentDate, appointmentTime]);

     // Return success message
     res.status(201).json({ message: 'Appointment created successfully' });

     //Display success messages
     }catch(error){
      res.status(500).json({message:'Failed to create an Appointment'})
     }

}

async function getAppointment(req,res){
    //Fetch info from the request body and perform the http requests
    const {id} = req.params;
    // Catch errors
    try{
     const appointment = await  appointmentModel.getAppointment(id);
     //Check if the appointment exists
     if(!appointment){
        res.status(404).json({message: "Appointment not found"});
     }
     res.status(200).json(appointment)

    }catch(error){
      res.status(500).json({error: 'Failed to get Appointment'})
    }
}

 async function updateAppointment (req,res){
     //Fetch data from the req body
     const {id} = req.params;
     const {patient_id,doctor_id,appointment_date,appointment_time,status} = req.body;
     // Catch errors
     try{
        const appointment = await appointmentModel.updateAppointment(id,patient_id,doctor_id,appointment_date, appointment_time,status);
        res.status(200).json({message: "Appointment updated successfully"});
     }
    catch(error){
        res.status(500).json({message: 'Failed to update an Appointment'})
        
    }
 }

    async function deleteAppointment(req,res){
        //Fetch data from the req body
        const {id} = req.params;
        // Catch errors
        try{
            const appointment = await appointmentModel.deleteAppointment(id);
            res.status(200).json({message: "Appointment deleted successfully"});
            }
            catch(error){
                res.status(500).json({message: 'Failed to delete an Appointment'})
                
            }
    }
module.exports = {
    createAppointment,
    getAppointment,
    updateAppointment,
    deleteAppointment
};