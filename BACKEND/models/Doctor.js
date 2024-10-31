//models/Doctors
//Create a class to execute the CRUD operations
const db = require('../config/db')
class Doctor{
    //CREATE
 static async create(doctorData){
    //Lets catch some error
    try{
        //Create a new doctor
        const [rows] = await db.execute('INSERT INTO doctors(first_name,last_name,specialization,email,phone,schedule) VALUES(?, ?, ?, ?, ?, ?)',
            //Store in an object
            [
                doctorData.first_name,
                doctorData.last_name,
                doctorData.specialization,
                doctorData.email,
                doctorData.phone,
                doctorData.schedule
            ]
        );
    } catch(error){
        console.error('Error creating doctor',error);
        throw new Error('Could not create a Doctor')
    }
 }

    //READ BY ID
    static async findById(id){
     try{
        const[rows] = await db.execute('SELECT * FROM doctors WHERE id = ?', [id]);
        if(rows.length === 0) {
            throw new Error ('Doctor not found');
        }
        return[0];
     }
     catch{
        console.log('Error finding  doctor',error);
        throw new Error('Could not retrieve Doctor');
     }
    }

    //UPDATE
    static async update(id,doctorData){
        //Lets catch some errors
        try{
            //Update the doctor
            const [rows] = await db.execute('UPDATE doctors SET  WHERE id = ?',[doctorData,id]);
               if(result[0] === 0){
                throw new Error('Doctor not found or no changes made');
               }
               else{
                //Display successful update
                console.log('Doctor updated successfully');
               }

        }catch{
            console.error('Error updating doctor',error);
            throw new Error('Could not update Doctor');
        }
    }

    //DELETE
    static async delete(id){
     try{
        const result = await db.execute('DELETE FROM doctors WHERE id = ?',[id]);
        if(result[0].affectedRows === 0){
            throw new Error('Doctor not found');
            }  
            else{
         //Display Successful Deletion
        console.log(`Doctor with id ${id} has been deleted`);
            }
     }catch{
        console.error('Error deleting doctor',error);
        throw new Error('Could not delete Doctor');
     }
    }
}
module.exports = Doctor;