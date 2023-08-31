const express = require('express');
const router = express.Router();
const {FuelStation} = require('../../models')

// const fuelController = require('../../controllers/fuelController');
// const isAuthenticated = require('../../middlewares/authMiddleware')

router.get('/locations', async (req,res) =>{
    try{
        const stationData = await FuelStation.findAll()
        stationData = JSON.stringify(stationData)
        res.status(200).json(stationData);
    }catch(err) {
        res.status(500).json(err)
    }
})

// Define fuel-related routes
// router.get('/prices', fuelController.showFuelPrices);

module.exports = router;
