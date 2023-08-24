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

// Process fuel prices and render view
const showFuelPrices = async (req, res) => {
  try {
  const fuelPrices = await fetchFuelPrices();
  res.render('fuelPrices', { fuelPrices }); // Render view with fuel prices
} catch (error)
 {
  console.error('Error processing fuel prices:', error);
  res.status(500).send('internal server error');
 }
};

module.exports = {
  showFuelPrices,
};
