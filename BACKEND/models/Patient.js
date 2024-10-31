const db = require('../config/db');

class Patient {
    // CREATE
    static async create(patientData) {
        try {
            // patientData is an object containing the necessary fields
            const result = await db.execute(
                'INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [
                    patientData.first_name,
                    patientData.last_name,
                    patientData.email,
                    patientData.password_hash,
                    patientData.phone,
                    patientData.date_of_birth,
                    patientData.gender,
                    patientData.address
                ]
            );
            return result[0].insertId; // Returns the ID of the newly inserted patient
        } catch (error) {
            console.error('Error creating patient:', error);
            throw new Error('Could not create patient'); // Rethrow with a user-friendly message
        }
    }

    // READ
    static async findById(id) {
        try {
            const [rows] = await db.execute('SELECT * FROM patients WHERE id = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Patient not found');
            }
            return rows[0];
        } catch (error) {
            console.error('Error finding patient:', error);
            throw new Error('Could not retrieve patient'); // Rethrow with a user-friendly message
        }
    }

    // UPDATE
    static async update(id, patientData) {
        try {
            // Create query to update specific fields
            const query = `
                UPDATE patients 
                SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? 
                WHERE id = ?`;
            const result = await db.execute(query, [
                patientData.first_name,
                patientData.last_name,
                patientData.phone,
                patientData.date_of_birth,
                patientData.gender,
                patientData.address,
                id
            ]);

            if (result[0].affectedRows === 0) {
                throw new Error('Patient not found or no changes made');
            }
        } catch (error) {
            console.error('Error updating patient:', error);
            throw new Error('Could not update patient'); // Rethrow with a user-friendly message
        }
    }

    // DELETE
    static async delete(id) {
        try {
            const result = await db.execute('DELETE FROM patients WHERE id = ?', [id]);
            if (result[0].affectedRows === 0) {
                throw new Error('Patient not found');
            } else {
                // Display successful deletion
                console.log(`Patient with ID ${id} has been deleted successfully`);
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
            throw new Error('Could not delete patient'); // Rethrow with a user-friendly message
        }
    }

    
    static async findByEmail(email) {
         try {
         const [rows] = await db.execute('SELECT * FROM patients WHERE email = ?', [email]);
         return rows.length > 0 ? rows[0] : null;  // Return patient data if found, otherwise null
    } catch (error) {
      console.error('Error finding patient by email:', error);
      throw new Error('Could not retrieve patient by email');
    }
  }
  
}

module.exports = Patient;
