/**
 * @file Functions to implement and modify the map through
 * Google Maps API.
 */

/**
 * @function createMarker
 * @param {Object} location
 * @param {string} location.title - The name of the location.
 * @param {Object} location.position - a LatLng object or
 * LatLngLiteral representing a point in geographical coordinates.
 * @returns {Object} marker
 * @description Creates a new Marker object from a location.
 */
var createMarker = function(location) {
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: location.position,
    title: location.title
  });

  return(marker);
}

/**
 * @function addMarker
 * @param {Object} marker
 * @description Adds a Marker object to the map.
 */
var addMarker = function(marker) {
  marker.setMap(map);
}

/**
 * @function singleBounceWhenClicked
 * @param {Object} marker
 * @description Add a single bounce animation to a Marker
 * object when clicked.
 */
var singleBounceWhenClicked = function(marker) {
  marker.addListener('click', function() {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    marker.setAnimation(null);
  });
}

/**
 * @function defaultBounds
 * @description Sets map bounds to include default markers.
 */
var defaultBounds = function() {
  var bounds = new google.maps.LatLngBounds();
  markers.forEach(function(marker) {
    bounds.extend(marker.position);
  });
  map.fitBounds(bounds);
}

/**
 * @function addLocation
 * @param {Object} location - contains location data.
 * @param {string} location.title - The name of the location.
 * @param {Object} location.position - a LatLng object or
 * LatLngLiteral representing a point in geographical coordinates.
 * @description Adds a new location to the App.
 */
var addLocation = function(location) {
  let marker = createMarker(location);
  singleBounceWhenClicked(marker);
  addMarker(marker);
  markers.push(marker);
}

/**
 * @function initMap
 * @description Initializes Map object.
 */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.690753, lng: -73.995638},
    zoom: 15
  });

  defaultLocations.forEach(addLocation);
  defaultBounds();
}

/**
 * @function mapError
 * @description Alerts user if Google Maps API does not load.
 */
function mapError() {
  alert("the map is currently unavailable");
}
