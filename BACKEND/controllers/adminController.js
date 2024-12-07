const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.createAdmin = async(req,res) =>{
    try{
        const{fullname,email,phone,username,password,role} = req.body;
        
        const userRole = role || 'Admin'
        // console.log('Requested body',req.body)
        const [rows] = await db.execute('SELECT * FROM admin WHERE username = ?',[username]);
        if (rows.length > 0){
            return res.status(400).json({message:'Username already exists,register for a new Admin Account'}); }
        
            const hashedPassword = await bcrypt.hash(password,10);
            await db.execute(
                'INSERT INTO admin(fullname, username, email, phone, password, role) VALUES(?,?,?,?,?,?)',
                [fullname, username, email, phone, hashedPassword, userRole]
            );
       
    }catch(error){
        console.log(error);
        console.error('Registration error:', error.message || error);
        res.status(500).json({ message: 'Error registering admin account', error });
    }
}

//To log in an admin
exports.loginAdmin = async(req,res) =>{
    try{
        const{email,password} = req.body;
        const[rows] =  await db.execute('SELECT * FROM admin WHERE email = ?',[email]);
        if(rows.length === 0){
            return res.status(400).json({message:"Admin  not found,register for a new one"})
        }
        const admin = rows[0];
        const isMatch = await bcrypt.compare(password,admin.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        else{
            //Generate a token
            const token = jwt.sign(
                {   
                    id:admin.id,
                    username:admin.email,
                    role:admin.role
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
        res.status(500).json({ message: 'Error logging in Admin ', error });
    }
}

//Update admin


//Delete the user
exports.deleteAdmin = async(req,res) =>{
    const admin_id = req.user.id;
    // Check if the user to update is available
    const [rows] = await db.query('SELECT * FROM admin WHERE id = ?',[admin_id]);
        if(rows.length === 0){
            return res.status(404).json({message:'No Admin Found'});
        }
        await db.query(`DELETE FROM admin WHERE id = ?`,[admin_id])
        res.status(200).json({
            message:"Doctors Account deleted succesfully"
        })
}

