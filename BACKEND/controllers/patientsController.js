//Import Packages
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

    // Register a new patient
   exports.registerPatient = async(req,res)=>{
    try {
      // Fetch the data from the frontend
      const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body || null;
      console.log("Received body",req.body); // Log the incoming request body
      // Check if a user already exists with the given email
      const[rows] =  await db.execute('SELECT * FROM patients WHERE email = ? ', [email]);

      if(rows.length > 0){
         return res.status(400).json({message: 'Email already exist,register for a new Account'});
      }
    
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.execute('INSERT INTO patients(first_name, last_name, email, password, phone, date_of_birth, gender, address) VALUES(?,?,?,?,?,?,?,?)',
        [first_name, last_name, email, hashedPassword, phone, date_of_birth, gender, address]);

      // Return success message
      res.status(200).json({ message: 'Patient account registered successfully'});
    } catch (error) {
      console.log(error);
      console.error('Registration error:', error.message || error);
      res.status(500).json({ message: 'Error registering patient account', error });
    }
  };
  
    // Login patient
    exports.loginPatient = async(req,res) =>{

      try{
        //Fetch the request body
        const{email,password} = req.body;
        
        //Check if the email exists
        const[rows] = await db.execute('SELECT * FROM patients WHERE email = ?',[email]);

        if(rows.length === 0){
          return res.status(400).json({message:'User not found please register'})
        }
        
        //Check if the passwords match
        const user = rows[0];
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
          return res.status(400).json({message:'Invalid Credentials'});
        }
        else{
          //Generation of the token
          const token = jwt.sign(
            { 
              id:user.id,
              email:user.email,
              first_name:user.first_name,
            },
            process.env.SECRET_KEY,
            {
              expiresIn:'1h' //Token expires in 1 hr
            }
          )
          //Send token back to the client
          res.status(200).json({ message: 'Login successful', token });
          
        }
        
      }catch(error){
         console.log(error);
         res.status(500).json({ message: 'Error logging in Patient', error });
      }

    };

    exports.updatePatient = async(req,res) =>{
     
      try{
        const{id} = req.params;
        const{first_name,last_name,phone,date_of_birth,gender,address} = req.body || null;
      
        const updatedData = { first_name, last_name, phone, date_of_birth, gender, address };
        
        const[result] = await db.query(
          `UPDATE patients SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ?, updated_at = NOW() WHERE id = ?`,
        [first_name, last_name, phone, date_of_birth, gender, address, id]
        );
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient data updated successfully' });

      }catch(error){
        console.error('Error updating patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    
      }

    }

 
  
  //   // Delete patient account
  //   static async delete(req, res) {
  //     try {
  //       const { id } = req.body;
  //       // Check if the patient exists
  //       const patient = await Patient.findById(id);
  //       if (!patient) {
  //         return res.status(400).json({ message: 'Patient does not exist' });
  //       }
  
  //       // Delete the patient
  //       await Patient.delete(id);
  
  //       res.status(200).json({ message: 'Patient account deleted successfully' });
  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).json({ message: 'Error deleting patient account', error });
  //     }
  //   }

  //    //A logout Method

  //    static async logout(req,res){
  //    //Destroy session
  //    req.session.destroy(err => {
  //     if (err) {
  //         return res.status(500).json({ message: 'Could not log out' });
  //     }
  //     res.status(200).json({ message: 'Logout successful' });
  // });
  //    }

  // }
