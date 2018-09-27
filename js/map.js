/**
 * @file Implements and modifies map using Google Maps API
 */

/**
 * @description Creates a new Marker object from a location
 */
var createMarker = function(location) {
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: location.position,
    title: location.title
  });
  markers.push(marker);
}

/**
 * @description Adds a Marker object to the map
 */
var addMarker = function(marker) {
  marker.setMap(map);
}

/**
 * @description Add a single bounce animation to a Marker
 * object when clicked
 */
var singleBounceWhenClicked = function(marker) {
  marker.addListener('click', function() {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    marker.setAnimation(null);
  });
}

/**
 * @description Sets map bounds to include default markers
 */
var defaultBounds = function() {
  var bounds = new google.maps.LatLngBounds();
  markers.forEach(function(marker) {
    bounds.extend(marker.position);
  });
  map.fitBounds(bounds);
}

/**
 * @description Initializes Map
 */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.690753, lng: -73.995638},
    zoom: 15
  });

  defaultLocations.forEach(createMarker);
  markers.forEach(addMarker);
  markers.forEach(singleBounceWhenClicked);
  defaultBounds();
}

/**
 * @description Alerts user if Google Maps API does not load
 */
function mapError() {
  alert("the map is currently unavailable");
}
