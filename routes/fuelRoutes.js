const express = require('express');
const router = express.Router();
const fuelController = require('../controllers/fuelController');

// Define fuel-related routes
router.get('/prices', fuelController.showFuelPrices);

module.exports = router;
