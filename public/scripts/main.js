require('dotenv').config();

// npm fetch package 
const fetch = require('node-fetch'); 

//api URL
const url = "https://api.onegov.nsw.gov.au/FuelPriceCheck/v1/fuel/prices/nearby";
const headers = {
  "accept": "application/json",
  "Authorization": process.env.APItoken,
  "Content-Type": "application/json",
  "apikey": process.env.APIkey,
  "transactionid": "123",
  "requesttimestamp": "28/08/2023 07:30:20 PM"
};

//necessary data to input for fetch request 
const data = {
    //full type necessary
  fueltype: "P95",
  brand: ["BP"],
  namedlocation: "2015",
  //latitude and longitude are necessary
  latitude: "-33.9080",
  longitude: "151.1903",
  radius: "5",
  sortby: "price",
  sortascending: "true"
};

const options = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(data)
};


fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));