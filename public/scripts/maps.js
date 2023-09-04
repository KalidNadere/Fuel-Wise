// Declare global variables
let map;
let pos;
let dataNSW;

// Navigator requests Geolocation
navigator.geolocation.getCurrentPosition(
  (position) => {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    console.log(pos);
    map.setCenter(pos);
    getFuel();
  },
  () => {
    handleLocationError(true, infoWindow, map.getCenter());
  },
);

// Google Maps
async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { LatLng } = await google.maps.importLibrary("core");
  const center = new LatLng(-33.8663965, 151.0467039);
  map = new Map(document.getElementById("map"), {
    zoom: 11,
    center,
    mapId: "d13ebef7973e4ad2"
  });
}

function toggleHighlight(markerView, property) {
  if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
  } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
  }
}

function newStation(station) {
  const content = document.createElement("div");

  content.classList.add("station");
  content.innerHTML = `
    <div class="icon">
        <span>${station.prices.price}c \u00A0</span>
        <span class="cent">${station.brand}</span>
    </div>
    <div class="details">
    <div class="prices">
        <div class="price">${station.prices.price}<span class="cent">c - </span>${station.prices.fueltype}</div>
        <div class="lastUpdated">${station.prices.lastupdated}</div>
    </div>
        <div class="distance">${station.location.distance}<span class="kilo"> km away</span></div>
        <div class="name">${station.name}</div>
        <div class="address">${station.address}</div>

    </div>
    `;
  return content;
}

async function getFuel() {
    let lat = pos.lat;
    let lon = pos.lng;
    const apiFetchPrice = (lat,lon) => {
      //api URL
      const url = "https://api.onegov.nsw.gov.au/FuelPriceCheck/v1/fuel/prices/nearby";
      const headers = {
          "accept": "application/json",
          "Authorization": "Bearer pJVeA1eBaEpIVUnJLVB4qEGk0PsI",//process.env.ACCESS_KEY,
          "Content-Type": "application/json",
          "apikey": "csnAKudd1pOGKLWIikPZRbZe9YrnO7Ij",//process.env.API_KEY,
          "transactionid": "123",
          "requesttimestamp": "28/08/2023 07:30:20 PM"
      };
      //necessary data to input for fetch request
      const postBody = {
          //full type necessary
          fueltype: "P95",
          brand: [],
          namedlocation: "",
          //latitude and longitude are necessary
          latitude: lat,
          longitude: lon,
          radius: "5",
          sortby: "price",
          sortascending: "true"
      };
      const options = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(postBody)
      };
      fetch(url, options)
      .then(response => response.json())
      .then(data => updateMap(data))
      .catch(error => console.error('Error:', error));
    };
    const runAPI = await apiFetchPrice(pos.lat, pos.lng)
}

function updateMap(data) {
  console.log(data);
  for (const station of data.stations) {
    let obj = data.prices.find(obj => obj.stationcode === station.code);
    station.prices = obj;
    const lat = station.location.latitude;
    const lng = station.location.longitude;
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: newStation(station),
      position: {lat, lng},
      title: station.name,
    });
  
    AdvancedMarkerElement.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, station);
    });
  }

}

initMap();
