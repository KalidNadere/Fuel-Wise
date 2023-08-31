const router = require('express').Router();
// const showFuelPrices = require('../controllers/fuelController');
const axios = require('axios');
require('dotenv').config();

router.get('/',async (req,res) => {
    try{
        const logged_in = req.session.logged_in || false;
        res.render('dashboard', {logged_in});
        console.log('Rendered homepage')
    }catch (err) {
        console.log("didnt render")
        res.status(500).json(err)
    }
})

router.get('/login', async (req,res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

// // Fetch nearby fuel stations and prices based on user's geolocation
// const fetchNearbyfuelStations = async (lat, lon) => {
//     const url = "https://api.onegov.nsw.gov.au/FuelPriceCheck/v1/fuel/prices/nearby";
//     const headers = {
//       "accept": "application/json",
//       "Authorization": process.env.ACCESS_KEY,
//       "Content-Type": "application/json",
//       "apikey": process.env.API_KEY,
//       "transactionid": "123",
//       "requesttimestamp": "28/08/2023 07:30:20 PM"
//     };
//     const postBody = {
//       fueltype: "P95", // Fuel type(Examples: P95, P98, E10). REQUIRED
//       brand: [], // Fuel brand name(Examples: BP, Shell, Caltex). NOT REQUIRED
//       namedlocation: "", // Suburb Number(Examples: 2000, 2015). NOT REQUIRED
//       //latitude and longitude. REQUIRED
//       latitude: lat,
//       longitude: lon,
//       radius: "5", // Search radius. REQUIRED
//       sortby: "price",
//       sortascending: "true"
//     };
//     const options = {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(postBody)
//     };
  
//     try {
      
//       const response = await axios.get(url,options);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching nearby fuel stations:', error);
//       return [];
//     }
// };
  
// // Process fuel prices and render view
// const showFuelPrices = async () => {
// try {
//     // Get user's geolocation
//     navigator.geolocation.getCurrentPosition(
//     async (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;

//         // Fetch fuel prices and nearby fuelstations
//         const nearbyStationPrices = await fetchNearbyfuelStations(lat, lon);

//         // Render view with fuel prices and nearby fuel stations
//         return nearbyStationPrices;
//     },
//     (error) => {
//         console.error('Geolocation error:', error);
//         return error;
//     }
//     );
// } catch (error) {
//     console.error('Error processing fuel prices:', error);
//     res.status(500).send('Internal server error');
// }
// };

module.exports = router;