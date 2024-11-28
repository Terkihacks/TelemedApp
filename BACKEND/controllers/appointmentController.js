//Import Packages
const getDoc = require('../utils/getDoc')
const db = require('../config/db');
  exports.createAppointment = async(req,res) => {
    //Fetch info from the request body and perform the http requests
    const {doctor,appointment_date,appointment_time,status} = req.body ;
    
     try{
      const patient_id = req.user.id;
      const doctor_id = await getDoc(doctor,db);
     //Join the tables patients and doctors to obtain the patient_id and doctor_id
     const joinQuery = `
     SELECT p.id AS patient_id,
            d.id AS doctor_id
     FROM patients p
     INNER JOIN Doctors d ON p.id = ? AND d.id = ?
     LIMIT 1
     `
     //Perform join query
     const [rows] = await db.execute(joinQuery,[patient_id,doctor_id]);
     // If no matching rows are found, return an error
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Patient or Doctor not found' });
    }
     //Write queries to insert the data to the database if the doctor and the patient exist
     const insertQuery = `
     INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status)
     VALUES (?, ?, ?, ?,?);
     `;
     await db.execute(insertQuery, [patient_id, doctor_id, appointment_date, appointment_time,status]);

     // Return success message
     res.status(201).json({ message: 'Appointment created successfully' });

     //Display success messages
     }catch(error){
        console.log(error)
      res.status(500).json({message:'Failed to create an Appointment'})
     }

}

exports.getAppointment = async(req,res) =>{
//Get the following info from the database
//Doctor name and doctor specialization from the doctors table
//The appointment date , status and time from the appointment table
  try{
  const patient_id = req.user.id;
  const query = `
  SELECT
  d.first_name AS doctor_name,
  d.specialization AS doctor_specialization,
  a.appointment_date,
  a.appointment_time,
  a.status
  FROM
  appointments a
  INNER JOIN
  doctors d ON a.doctor_id = d.id
  WHERE
  a.patient_id = ?

  `
  const [rows] = await db.execute(query,[patient_id]);
          // Check if appointments were found
          if (rows.length === 0) {
            return res.status(404).json({ message: "No appointments found for the user." });
        }

// Send the appointment data as a response
return res.status(200).json(rows);
  }
  catch(error){
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "An error occurred while fetching appointments." });
  }
}



//  async function updateAppointment (req,res){
//      //Fetch data from the req body
//      const {id} = req.params;
//      const {patient_id,doctor_id,appointment_date,appointment_time,status} = req.body;
//      // Catch errors
//      try{
//         const appointment = await appointmentModel.updateAppointment(id,patient_id,doctor_id,appointment_date, appointment_time,status);
//         res.status(200).json({message: "Appointment updated successfully"});
//      }
//     catch(error){
//         res.status(500).json({message: 'Failed to update an Appointment'})
        
//     }
//  }

//     async function deleteAppointment(req,res){
//         //Fetch data from the req body
//         const {id} = req.params;
//         // Catch errors
//         try{
//             const appointment = await appointmentModel.deleteAppointment(id);
//             res.status(200).json({message: "Appointment deleted successfully"});
//             }
//             catch(error){
//                 res.status(500).json({message: 'Failed to delete an Appointment'})
                
//             }
//     }
// module.exports = {
//     getAppointment,
//     updateAppointment,
//     deleteAppointment
// };