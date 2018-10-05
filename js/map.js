/**
 * @file Functions to implement and modify the map through
 * Google Maps API.
 */

var iconDefault = './img/icon-default.svg';

var iconPath = 'M0.5,13.031c0,9.114,7.443,12.911,10.177,21.342c2.05,6.321,1.199,7.704,2.517,7.704c1.189,0,0.983-2.251,2.799-8.16c2.925-9.512,9.949-12.452,9.949-20.658C25.942,7.49,21.903,0.5,13.107,0.5C4.011,0.5,0.5,7.943,0.5,13.031z';

/**
 * @function createAppMarker
 * @param {Object} location
 * @param {string} location.title - The name of the location.
 * @param {Object} location.position - a LatLng object or
 * LatLngLiteral representing a point in geographical coordinates.
 * @returns {Object} marker
 * @description Creates a new Marker object from a location and
 * sets it to the default settings for the App.
 */
var createAppMarker = function(location) {
  var marker = createMarker(location);
  setMarkerEvents(marker);
  addMarkerToApp(marker);
  return marker;
}

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
  return new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    icon: iconDefault,
    position: location.position,
    title: location.title
  });
}

/**
 * @function addMarkerToApp
 * @param {Object} marker
 * @description Adds a Marker object to the App.
 */
var addMarkerToApp = function(marker) {
  markers.push(marker);
  marker.setMap(map);
}

/**
 * @function setMarkerEvents
 * @param {Object} marker
 * @description Set default events to Marker object.
 */
var setMarkerEvents = function(marker) {
  setMarkerMouseoverEvents(marker);
  setMarkerMouseoutEvents(marker);
  setMarkerClickEvents(marker);
}

/**
 * @function setMarkerMouseoverEvents
 * @param {Object} marker
 * @description Add default mouseover events to Marker object.
 */
var setMarkerMouseoverEvents = function(marker) {
  marker.addListener('mouseover', function() {
    highlightMarker(this);
  });
}

/**
 * @function setMarkerMouseoutEvents
 * @param {Object} marker
 * @description Add default mouseout events to Marker object.
 */
var setMarkerMouseoutEvents = function(marker) {
  marker.addListener('mouseout', function() {
    unhighlightMarker(this);
  });
}

/**
 * @function setMarkerClickEvents
 * @param {Object} marker
 * @description Add default click events to Marker object.
 */
var setMarkerClickEvents = function(marker) {
  marker.addListener('click', function() {
    singleBounceAnimation(this);
  });
}

/**
 * @function highlightMarker
 * @param {Object} marker
 * @description Change Icon color.
 */
var highlightMarker = function(marker) {
  marker.setIcon({
    anchor: new google.maps.Point(13, 42),
    fillColor: 'hsl(272, 94%, 50%)',
    fillOpacity: 1.0,
    path: iconPath,
    strokeColor: 'hsl(0, 0%, 100%)'
  });
}

/**
 * @function unhighlightMarker
 * @param {Object} marker
 * @description Restore Icon color.
 */
var unhighlightMarker = function(marker) {
  marker.setIcon(iconDefault);
}

/**
 * @function singleBounceAnimation
 * @param {Object} marker
 * @description Add a single bounce animation to Marker
 * object.
 */
var singleBounceAnimation = function(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  marker.setAnimation(null);
}

/**
 * @function resizeMapBounds
 * @description Sets map bounds to include visible markers.
 */
var resizeMapBounds = function() {
  var bounds = new google.maps.LatLngBounds();
  var anyVisibleMarkers = false;

  markers.forEach(function(marker) {
    if (marker.getVisible()) {
      bounds.extend(marker.position);
      anyVisibleMarkers = true;
    }
  });

  if (anyVisibleMarkers) {
    map.fitBounds(bounds);
  }
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

  startLocationProcessing(true);
}

/**
 * @function mapError
 * @description Alerts user if Google Maps API does not load.
 */
function mapError() {
  alert("the map is currently unavailable");
}
