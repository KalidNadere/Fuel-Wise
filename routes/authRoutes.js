const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
//router.post('/profile', authController.profile);
router.get('/logout', authController.logout);

module.exports = router;
