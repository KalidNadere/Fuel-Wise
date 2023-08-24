const express = require('express');
const router = express.Router();
const fuelController = require('../controllers/fuelController');
const isAuthenticated = require('../middlewares/authMiddleware')

// Define fuel-related routes
router.get('/prices', fuelController.showFuelPrices);

module.exports = router;
