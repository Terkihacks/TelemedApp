// READ: Get a specific doctor by ID
exports.getDocById = async(req,res) =>{
    const doctor_id = req.user.id;
    try{
        const [rows] = await db.execute('SELECT * FROM doctors WHERE id = ?',[doctor_id]);
        if(rows.length === 0){
            return res.status(404).json({message:'No Doctors Found'});
        }
        res.status(200).json(rows[0]);
    }catch(error){
        console.log("Error fetching doctor by ID:", error.message);
        res.status(500).json({ error: "An error occurred while fetching the doctor" });
    }
    
 }
 