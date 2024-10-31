//models/Appointments
//Import the db config
const db = require('../config/db');

//Create a class 
class Appointment{
    //CREATE AN APPOINTMENT 
    static async create(appointmentData){
//Lets catch some errors
try{
//Insert the appointment into the database
const [rows] = await db.execute(
'INSERT INTO appointments ( INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status)VALUES (?, ?, ?, ?, ?))'
//Lets store it in an object
[ 
    appointmentData.patient_id,
    appointmentData.doctor_id,
    appointmentData.appointment_date,
    appointmentData.appointment_time,
    appointmentData.status
]
);
  console.log('Appointment created successfully')
}catch(error) {
    console.error('Error creating patient:', error);
    throw new Error('Could not create patient'); // Rethrow with a user-friendly message
}
    }
   
    //GET/READ ALL APPOINTMENTS

    static async findById(id){
          //You know the drill
          try{
            //SELECT * FROM appointments WHERE id = ?
            const[rows] = await db.execute( 'SELECT * FROM appointments WHERE  id = ?', [id] ); //We are going to use a parameterized query
            
                 if (rows.length === 0) {
                    throw new Error('Patient not found');
                } else{
                    console.log('Patients have been found successfully')
                }
                return rows[0];
          
          } catch(error){
            console.log("Error getting Appointments",error);
            throw new Error('Could not get appointments');
          }
    }

     //UPDATE APPOINTMENTS

     static async update(id,appointmentData){
    
        try{
            const result = await db.execute('UPDATE appointments SET = ? WHERE = ?',[appointmentData,id]);
            if(result[0].affectedRows === 0){
                throw new Error('No appointments found');
            }
            else{
              console.log('Records updated succesfully');
            }

        }catch(error){
            console.log('Error updating appointment',error);
            throw new Error('Could not get appointments');
        }

     }

       //DELETE APPOINTMENTS
       static async  delete(id){
            try{
                const result = await db.execute('DELETE FROM appointments WHERE id = ?', [id]);
                if(result[0].affectedRows === 0){
                    throw new Error('No appointments found');
                    }
                    else{
                        console.log('Records deleted succesfully');
                    }
            }catch(error){
                console.log('Error deleting appointment',error);
                throw new Error('Could not delete appointment');
            }
       }
}

module.exports = Appointment;