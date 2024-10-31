const appointmentModel =  require('../models/Appointment');
 
//Create methods 
async function createAppointment(req,res){
    //Fetch info from the request body and perform the http requests
    const {patient_id,doctor_id,appointment_date,appointment_time,status} = req.body;
     // Catch errors
     try{
        const appointmentId = await appointmentModel.create(patient_id,doctor_id,appointment_date,appointment_time,status)
        res.status(201).json({message: "Appointment created successfully",id:appointmentId});
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