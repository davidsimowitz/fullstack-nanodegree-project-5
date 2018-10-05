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
    icon: './img/icon-default.svg',
    position: location.position,
    title: location.title
  });

  return(marker);
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
 * @function highlightMarker
 * @param {Object} marker
 * @description Change Icon color.
 */
var highlightMarker = function(marker) {
  marker.setIcon({
    anchor: new google.maps.Point(13, 42),
    fillColor: 'hsl(272, 94%, 50%)',
    fillOpacity: 1.0,
    path: 'M0.5,13.031c0,9.114,7.443,12.911,10.177,21.342c2.05,6.321,1.199,7.704,2.517,7.704c1.189,0,0.983-2.251,2.799-8.16c2.925-9.512,9.949-12.452,9.949-20.658C25.942,7.49,21.903,0.5,13.107,0.5C4.011,0.5,0.5,7.943,0.5,13.031z',
    strokeColor: '#FFFFFF'
  });
}

/**
 * @function unhighlightMarker
 * @param {Object} marker
 * @description Restore Icon color.
 */
var unhighlightMarker = function(marker) {
  marker.setIcon('./img/icon-default.svg');
}

/**
 * @function setMouseover
 * @param {Object} marker
 * @description Change Icon to show mouseover.
 */
var setMouseover = function(marker) {
  marker.addListener('mouseover', function() {
    highlightMarker(this);
  });
}

/**
 * @function setMouseout
 * @param {Object} marker
 * @description Change Icon back after mouseover.
 */
var setMouseout = function(marker) {
  marker.addListener('mouseout', function() {
    unhighlightMarker(this);
  });
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
