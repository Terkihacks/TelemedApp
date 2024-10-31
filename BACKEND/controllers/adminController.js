
const AdminModel = require('../models/Admin');
// Create a new admin
async function createAdmin(req, res) {
    const { username, password, role } = req.body;
    try {
        const adminId = await AdminModel.create(username, password, role);
        res.status(201).json({ message: 'Admin created successfully', id: adminId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create admin' });
    }
}

// Get admin by ID
async function getAdmin(req, res) {
    const {username } = req.params;

    try {
        const admin = await AdminModel.findByUsername(username);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admin' });
    }
}

// Update an admin
async function updateAdmin(req, res) {
    const { id } = req.params;
    const updates = req.body;

    try {
        const affectedRows = await AdminModel.update(id, updates);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Admin not found or nothing to update' });
        }
        res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update admin' });
    }
}

// Delete an admin
async function deleteAdmin(req, res) {
    const { id } = req.params;

    try {
        const affectedRows = await AdminModel.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete admin' });
    }
}

module.exports = {
    createAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
};
