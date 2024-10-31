
// module.exports = router;
const express = require('express');
const { createAdmin, getAdmin, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware'); // Importing the middleware
const sessionMiddleware = require('../middleware/sessionMiddleware');
const session = require('express-session');
const router = express.Router();

// Apply the middleware to the routes that require admin access
router.post('/admin', adminMiddleware,sessionMiddleware, createAdmin);
router.get('/admin/:id', adminMiddleware,sessionMiddleware, getAdmin);
router.patch('/admin/:id', adminMiddleware, updateAdmin);
router.delete('/admin/:id', adminMiddleware, deleteAdmin);

module.exports = router;