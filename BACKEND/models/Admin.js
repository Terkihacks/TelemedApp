const db = require('../config/db'); // Database connection
const bcrypt = require('bcrypt'); // For password hashing
const mysql = require('mysql2/promise')

class Admin {
    // Create a new admin user 
    static async create(adminData) {
        try {
            const hashedPassword = await bcrypt.hash(adminData.password, 10);
            const [rows] = await db.execute(
                'INSERT INTO admin (username, password_hash, role) VALUES (?, ?, ?)',
                [adminData.username, hashedPassword, adminData.role]
            );
            return rows.insertId; // Return the ID of the newly created admin
        } catch (error) {
            console.error('Error creating admin:', error);
            throw new Error('Could not create admin'); 
        }
    }
    // Find an admin by username
    static async findByUsername(username) {
        try {
            const [rows] = await db.execute('SELECT * FROM admin WHERE username = ?', [username]);
            return rows[0]; // Return the found admin or undefined if not found
        } catch (error) {
            console.error('Error finding admin:', error);
            throw new Error('Could not retrieve admin');
        }
    }
    // Update an existing admin user
    static async update(id, adminData) {
        try {
            const updates = [];
            const params = [];

            if (adminData.username) {
                updates.push('username = ?');
                params.push(adminData.username);
            }
            if (adminData.password) {
                const hashedPassword = await bcrypt.hash(adminData.password, 10);
                updates.push('password_hash = ?');
                params.push(hashedPassword);
            }
            if (adminData.role) {
                updates.push('role = ?');
                params.push(adminData.role);
            }

            if (updates.length === 0) throw new Error('No fields to update');

            params.push(id); // Add ID to the end for the WHERE clause
            await db.execute(`UPDATE admin SET ${updates.join(', ')} WHERE id = ?`, params);
        } catch (error) {
            console.error('Error updating admin:', error);
            throw new Error('Could not update admin');
        }
    }

    // Delete an admin user
    static async delete(id) {
        try {
            const result = await db.execute('DELETE FROM admin WHERE id = ?', [id]);
            if (!result[0].affectedRows) throw new Error('Admin not found');
        } catch (error) {
            console.error('Error deleting admin:', error);
            throw new Error('Could not delete admin');
        }
    }
}

module.exports = Admin;