/**
 * @file Implements and modifies map using Google Maps API
 */

var map;

/**
 * @description Initializes Map
 */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.690753, lng: -73.995638},
    zoom: 15
  });
}

function mapError() {
  alert("the map is currently unavailable");
}
