const db = require('../config/db');
//Get a specific doctor by first nam and ID
const getDocById = async(doctorName,db) =>{
    try{
        const [rows] = await db.query('SELECT * FROM doctors WHERE first_name = ? LIMIT 1',[doctorName]);
        return rows.length > 0 ? rows[0].id : null;
    }catch(error){
        console.log("Error fetching doctor by ID:", error.message);
        throw new Error("An error occurred while fetching the doctor");
    }
    
 }
module.exports = getDocById