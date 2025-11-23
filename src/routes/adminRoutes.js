const express = require('express');
const adminController = require('../controllers/adminController');
const authenticateAdmin = require('../middleware/auth');

const router = express.Router();

// Public admin routes
router.post('/register', adminController.register);
router.post('/login', adminController.login);

// Protected admin routes
router.get('/signalements', authenticateAdmin, adminController.listAdminSignalements);
router.patch('/signalements/:id/statut', authenticateAdmin, adminController.updateStatutController);

module.exports = router;
