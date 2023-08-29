async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const { LatLng } = await google.maps.importLibrary("core");
  const center = new LatLng(-33.43238031167444, 151.16795397128632);
  const map = new Map(document.getElementById("map"), {
    zoom: 11,
    center,
    mapId: "d13ebef7973e4ad2"
  });

  const stations = NSWdata.stations;
  for (const station of stations) {
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

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(pos);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      },
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
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
          <span>${station.prices.fueltype} ${station.prices.price}c</span>
      </div>
      <div class="details">
          <div class="name">${station.name}</div>
          <div class="address">${station.address}</div>
          <div class="distance">${station.location.distance}km away</div>
          <div class="prices">
              <div class="price">${station.prices.price}c - ${station.prices.fueltype}</div>
              <div class="price">${station.prices.lastupdated}</div>
          </div>
      </div>
      `;
  return content;
}

const NSWdata = {
  "stations": [
      {
      "stationid": "1-GN9E-471",
      "brandid": "1-GFYV-0",
      "brand": "BP",
      "code": 415,
      "name": "BP Tumbi Umbi",
      "address": "Cnr Wyong Rd & Mingara Dve, Tumbi Umbi NSW 2261",
      "location": {
          "latitude": -33.36272,
          "longitude": 151.44428,
          "distance": 15.97
      }
      },
      {
      "stationid": "1-GN9E-401",
      "brandid": "1-GFYV-0",
      "brand": "BP",
      "code": 338,
      "name": "BP Berkeley Vale",
      "address": "1 Blade Close, Berkeley Vale NSW 2261",
      "location": {
          "latitude": -33.330562,
          "longitude": 151.423842,
          "distance": 16.66
      }
      },
      {
      "stationid": "1-GN9E-441",
      "brandid": "1-GFYV-0",
      "brand": "BP",
      "code": 382,
      "name": "BP Wyoming",
      "address": "481 Pacific Highway, Wyoming NSW 2250",
      "location": {
          "latitude": -33.408004,
          "longitude": 151.351119,
          "distance": 5.96
      }
      },
      {
      "stationid": "1-3VXN3NQ",
      "brandid": "1-GFYV-0",
      "brand": "BP",
      "code": 19016,
      "name": "BP Erina",
      "address": "90 THE ENTRANCE ROAD, ERINA NSW 2250",
      "location": {
          "latitude": -33.438429,
          "longitude": 151.372213,
          "distance": 7.03
      }
      }
  ],
  "prices": [
      {
      "stationcode": 338,
      "fueltype": "P95",
      "price": 220.9,
      "priceunit": "litre",
      "description": null,
      "lastupdated": "2023-08-23 00:28:45"
      },
      {
      "stationcode": 382,
      "fueltype": "P95",
      "price": 229.9,
      "priceunit": "litre",
      "description": null,
      "lastupdated": "2023-08-23 00:28:45"
      },
      {
      "stationcode": 415,
      "fueltype": "P95",
      "price": 211.9,
      "priceunit": "litre",
      "description": null,
      "lastupdated": "2023-08-23 05:22:49"
      },
      {
      "stationcode": 19016,
      "fueltype": "P95",
      "price": 235.9,
      "priceunit": "litre",
      "description": null,
      "lastupdated": "2023-08-23 19:52:52"
      }
  ]
}

for (const station of NSWdata.stations) {
  console.log(station);
  let obj = NSWdata.prices.find(obj => obj.stationcode === station.code);
  console.log(obj);
  station.prices = obj;
}

initMap();