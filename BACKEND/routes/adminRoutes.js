
// module.exports = router;
const express = require('express');
const { createAdmin, getAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware'); // Importing the middleware
const {sessionMiddleware} = require('../middleware/sessionMiddleware');
const router = express.Router();

// Apply the middleware to the routes that require admin access
router.post('/admin', sessionMiddleware, createAdmin);
router.get('/admin/:id', sessionMiddleware, adminMiddleware, getAdmin);
router.patch('/admin/:id', sessionMiddleware, adminMiddleware, updateAdmin);
router.delete('/admin/:id', sessionMiddleware, adminMiddleware, deleteAdmin);

module.exports = router;