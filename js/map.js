/**
 * @file Functions to implement and modify the map through Google Maps API.
 */

 // Invoke strict mode syntax.
'use strict';

const iconPath = 'M0.5,13.031c0,9.114,7.443,12.911,10.177,21.342c2.05,6.321,' +
    '1.199,7.704,2.517,7.704c1.189,0,0.983-2.251,2.799-8.16c2.925-9.512,' +
    '9.949-12.452,9.949-20.658C25.942,7.49,21.903,0.5,13.107,0.5C4.011,' +
    '0.5,0.5,7.943,0.5,13.031z';

/**
 * @function hsl
 * @param {number} h - The hue of the color.
 * @param {number} s - The saturation of the color.
 * @param {number} l - The lightness of the color.
 * @returns {string} color in HSL format
 * @description Creates a new color using the HSL color format parameters.
 */
const hsl = function(h = 233, s = 94, l = 50) {
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

/**
 * @function createAppMarker
 * @param {Object} location
 * @param {string} location.title - The name of the location.
 * @param {Object} location.position - a LatLng object or LatLngLiteral
 * representing a point in geographical coordinates.
 * @returns {Object} marker
 * @description Creates a new Marker object from a location and sets it to the
 * default settings for the App.
 */
const createAppMarker = function(location) {
  const marker = createMarker(location);
  addMarkerToApp(marker);
  return marker;
}

/**
 * @function createIcon
 * @param {string} color - The fill color in HSL format.
 * @returns {string} Icon
 * @description Creates a new icon to be set to a marker object. The icon's
 * fill color will be determined by the supplied HSL color format parameters.
 */
const createIcon = function(color = hsl(h = 233, s = 94, l = 50)) {
  return {
    anchor: new google.maps.Point(13, 42),
    fillColor: color,
    fillOpacity: 1.0,
    path: iconPath,
    strokeColor: 'hsl(0, 0%, 100%)',
  };
}

/**
 * @function setInfoWindow
 * @param {Object} marker
 * @param {Object} infoWindow
 * @description Sets the marker's InfoWindow object with the default content.
 */
const setInfoWindow = function(marker, infoWindow) {
  generateInfoWindowContent(marker, infoWindow);
}

/**
 * @function createInfoWindow
 * @param {string} infoWindowContent
 * @returns {Object} infoWindow
 * @description Creates a new InfoWindow object.
 */
const createInfoWindow = function(infoWindowContent = '') {
  return new google.maps.InfoWindow({
    content: infoWindowContent,
  });
}

/**
 * @function generateInfoWindowContent
 * @param {Object} marker
 * @param {Object} infoWindow
 * @description Set the content on the infoWindow to that of the information
 * associated with the marker's corresponding Foursquare venue.
 */
const generateInfoWindowContent = function(marker, infoWindow) {
  // Search parameters.
  const client_id = "ZOWBSDUKA1ZLZ0HS3UUCWDSE1NTEQTE5IV3K4G4GYJ3V0HM4";
  const client_secret = "QXQA0Y3XU5XATZXHF3XBDOX15HFA0FW10N0N2KY5MHGFFWPT";
  const latlng = marker.getPosition().lat() + ',' + marker.getPosition().lng();

  // Foursquare API - Match Venue Request
  const foursquareRequest = new XMLHttpRequest();
  foursquareRequest.open('GET',
                         'https://api.foursquare.com/v2/venues/search' +
                             '?v=20180808&client_id=' + client_id +
                             '&client_secret=' + client_secret +
                             '&ll=' + latlng +
                             '&intent=match' +
                             '&name=' + marker.getTitle() +
                             '&limit=1',
                         true /* async */);
  foursquareRequest.onload = function() {
    // Code for handling API response.
    if (this.status >= 200 && this.status < 400) {
      // Request succeeded.
      let infoWindowContent = '';
      try {
        // Venue matched.
        const venue = JSON.parse(this.responseText)['response']['venues'][0];
        infoWindowContent =
            '<section class="info-window-wrapper">' +
              '<section class="info-window-header">' +
                '<h3 class="info-window-title">' + marker.getTitle() +
                '</h3>' +
              '</section>' +
              '<section class="info-window-body">' +
                '<h4 class="info-window-address">' + venue.location.address +
                '</h4>';

        if (venue.location.crossStreet) {
          infoWindowContent +=
              '<h5 class="info-window-address">(' +
                venue.location.crossStreet + ')</h5>'
        }
        if (venue.location.city &&
            venue.location.state &&
            venue.location.postalCode) {
          infoWindowContent +=
                '<h6 class="info-window-address">' + venue.location.city +
                ', ' + venue.location.state + ' ' + venue.location.postalCode +
                '</h6>'
        }
        infoWindowContent +=
              '</section>' +
              '<section class="info-window-footer">' +
                '<img class="info-window-foursquare-logo" ' +
                    'src="img/Powered-by-Foursquare-one-color-300.png" ' +
                    'alt="Powered by Foursquare">' +
              '</section>' +
            '</section>';
      }
      catch (error) {
        if (error instanceof TypeError) {
          // Venue not matched.
          infoWindowContent =
              '<section class="info-window-wrapper">' +
                '<section class="info-window-header">' +
                  '<h3 class="info-window-title">' + marker.getTitle() +
                  '</h3>' +
                '</section>' +
                '<section class="info-window-body">' +
                  '<h4 class="info-window-error">' +
                    'our apologies, Foursquare® does not have the ' +
                    'address for this location</h4>' +
                '</section>' +
                '<section class="info-window-footer">' +
                  '<img class="info-window-foursquare-logo" ' +
                      'src="img/Powered-by-Foursquare-one-color-300.png" ' +
                      'alt="Powered by Foursquare">' +
                '</section>' +
              '</section>';
        } else {
          // one or more venue field(s) not found.
          infoWindowContent =
              '<section class="info-window-wrapper">' +
                '<section class="info-window-body">' +
                  '<h4 class="info-window-error">' +
                    'our apologies, this feature is currently unavailable ' +
                    'for this establishment</h4>' +
                '</section>' +
                '<section class="info-window-footer">' +
                  '<img class="info-window-foursquare-logo" ' +
                      'src="img/Powered-by-Foursquare-one-color-300.png" ' +
                      'alt="Powered by Foursquare">' +
                '</section>' +
              '</section>';
        }
      }
      finally {
        infoWindow.setContent(infoWindowContent);
      }
    } else {
      // Encountered server error.
      const infoWindowContent =
          '<section class="info-window-wrapper">' +
            '<section class="info-window-header">' +
              '<h3 class="info-window-title">' + marker.getTitle() + '</h3>' +
            '</section>' +
            '<section class="info-window-body">' +
              '<h4 class="info-window-error">' +
                'our apologies, Foursquare® is currently unavailable</h4>' +
            '</section>' +
            '<section class="info-window-footer">' +
              '<img class="info-window-foursquare-logo" ' +
                  'src="img/Powered-by-Foursquare-one-color-300.png" ' +
                  'alt="Powered by Foursquare">' +
            '</section>' +
          '</section>';
      infoWindow.setContent(infoWindowContent);
    }
  };
  foursquareRequest.onerror = function() {
    // XMLHttpRequest transaction failed.
    const infoWindowContent =
          '<section class="info-window-wrapper">' +
            '<section class="info-window-header">' +
              '<h3 class="info-window-title">' + marker.getTitle() + '</h3>' +
            '</section>' +
            '<section class="info-window-body">' +
              '<h4 class="info-window-error">' +
                'sorry for the inconvenience, ' +
                'this feature is currently unavailable</h4>' +
            '</section>' +
            '<section class="info-window-footer">' +
              '<img class="info-window-foursquare-logo" ' +
                  'src="img/Powered-by-Foursquare-one-color-300.png" ' +
                  'alt="Powered by Foursquare">' +
            '</section>' +
          '</section>';
      infoWindow.setContent(infoWindowContent);
  };
  foursquareRequest.send();
}

/**
 * @function setInfoWindowCloseClickEvents
 * @param {Object} marker
 * @param {Object} infoWindow
 * @description Set default closeclick events to InfoWindow object.
 */
const setInfoWindowCloseClickEvents =
    function(marker, infoWindow) {
      // Unselect marker when closing infoWindow.
      infoWindow.addListener('closeclick', function() {
        google.maps.event.trigger(marker, 'click');
      });
    }

/**
 * @function createMarker
 * @param {Object} location
 * @param {string} location.title - The name of the location.
 * @param {Object} location.position - a LatLng object or LatLngLiteral
 * @param {string} color - The fill color in HSL format.
 * representing a point in geographical coordinates.
 * @returns {Object} marker
 * @description Creates a new Marker object from a location.
 */
const createMarker = function(location, color = hsl(269, 80, 36)) {
  return new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    icon: createIcon(color),
    position: location.position,
    title: location.title,
  });
}

/**
 * @function addMarkerToApp
 * @param {Object} marker
 * @description Adds a Marker object to the App.
 */
const addMarkerToApp = function(marker) {
  markers.push(marker);
  marker.setMap(map);
}

/**
 * @function setAppEvents
 * @param {Object} marker
 * @param {Object} infoWindow
 * @description Set default events to Marker and Info Window objects.
 */
const setAppEvents = function(marker, infoWindow) {
  setInfoWindowCloseClickEvents(marker, infoWindow);
  const mouseoverListener = setMarkerMouseoverEvents(marker);
  const mouseoutListener = setMarkerMouseoutEvents(marker);
  setMarkerClickEvents(
      marker,
      infoWindow,
      mouseoverListener,
      mouseoutListener,
  );
}

/**
 * @function setMarkerMouseoverEvents
 * @param {Object} marker
 * @returns {listener} mouseover listener
 * @description Add default mouseover events to Marker object.
 */
const setMarkerMouseoverEvents = function(marker) {
  return google.maps.event.addListener(marker, 'mouseover', function() {
    highlightMarker(this);
  });
}

/**
 * @function setMarkerMouseoutEvents
 * @param {Object} marker
 * @returns {listener} mouseout listener
 * @description Add default mouseout events to Marker object.
 */
const setMarkerMouseoutEvents = function(marker) {
  return google.maps.event.addListener(marker, 'mouseout', function() {
    unhighlightMarker(this);
  });
}

/**
 * @function setMarkerClickEvents
 * @param {Object} marker
 * @param {Object} infoWindow
 * @param {listener} mouseoverListener
 * @param {listener} mouseoutListener
 * @description Add default click events to Marker object.
 */
const setMarkerClickEvents =
    function(marker, infoWindow, mouseoverListener, mouseoutListener) {
      let selected = false;
      let mouseover = mouseoverListener;
      let mouseout = mouseoutListener;

      google.maps.event.addListener(marker, 'click', function() {
        // Unselect any selected marker.
        if (currentMarker && currentMarker != marker) {
          google.maps.event.trigger(currentMarker, 'click');
        }
        // Toggle selected state.
        selected = selected ? false : true;

        if (selected) {
          // Set marker to selected state.
          currentMarker = this;
          google.maps.event.removeListener(mouseover);
          google.maps.event.removeListener(mouseout);
          infoWindow.open(map, this);
          singleBounceAnimation(this);
          highlightMarker(marker, hsl(264, 92, 82));
        } else {
          // Restore marker to unselected state.
          currentMarker = null;
          infoWindow.close();
          unhighlightMarker(this);
          mouseover = setMarkerMouseoverEvents(this);
          mouseout = setMarkerMouseoutEvents(this);
        }
      });
    }

/**
 * @function highlightMarker
 * @param {Object} marker
 * @param {string} color - The fill color in HSL format.
 * @description Change Icon color.
 */
const highlightMarker =
    function(marker, color = hsl(271, 80, 66)) {
      marker.setIcon(createIcon(color));
    }

/**
 * @function unhighlightMarker
 * @param {Object} marker
 * @param {string} color - The fill color in HSL format.
 * @description Restore Icon color.
 */
const unhighlightMarker =
    function(marker, color = hsl(269, 80, 36)) {
      marker.setIcon(createIcon(color));
    }

/**
 * @function singleBounceAnimation
 * @param {Object} marker
 * @description Add a single bounce animation to Marker object.
 */
const singleBounceAnimation = function(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  window.setTimeout(function() {
    marker.setAnimation(null);
  }, 500);
}

/**
 * @function resizeMapBounds
 * @description Sets map bounds to include visible markers.
 */
const resizeMapBounds = function() {
  const bounds = new google.maps.LatLngBounds();
  let anyVisibleMarkers = false;

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
    zoom: 15,
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
