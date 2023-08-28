const axios = require('axios');

// Fetch fuel prices from Fuel Check API
const fetchFuelPrices = async () => {
  try {
    const response = await axios.get('FUEL_CHECK_API');
    return response.data;
  } catch (error) {
    console.error('Error fetching fuel prices:', error);
    return [];
  }
};

// Fetch nearby fuel stations based on user's geolocation
const fetchNearbyfuelStations = async (lat, lon) => {
  try {
    const response = await axios.get(`FuelStationAPI?lat=${lat}&lon=${lon}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby fuel stations:', error);
    return [];
  }
};

// Process fuel prices and render view
const showFuelPrices = async (req, res) => {
  try {
    // Get user's geolocation
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const log = position.coords.longitude;

        // Fetch fuel prices and nearby fuelstations
        const fuelPrices = await fetchFuelPrices();
        const fetchNearbyfuelStations = await fetchNearbyfuelStations(lat, lon);

        // Render view with fuel prices and nearby fuel stations
        res.render('fuelPrices', { fuelPrices, fetchNearbyfuelStations });
      },
      (error) => {
        console.error('Geolocation error:', error);
        res.status(500).send('Geolocation error');
      }
    );
  } catch (error) {
    console.error('Error processing fuel prices:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  showFuelPrices,
};
