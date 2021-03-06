/**
 * @file Implement App's location list menu functionality.
 */

 // Invoke strict mode syntax.
'use strict';

let map;
let currentMarker;
const markers = [];
const startLocationProcessing = ko.observable(false);

// SVG path used for the shape of the Marker's icon.
const iconPath = 'M0.5,13.031c0,9.114,7.443,12.911,10.177,21.342c2.05,6.321,' +
    '1.199,7.704,2.517,7.704c1.189,0,0.983-2.251,2.799-8.16c2.925-9.512,' +
    '9.949-12.452,9.949-20.658C25.942,7.49,21.903,0.5,13.107,0.5C4.011,' +
    '0.5,0.5,7.943,0.5,13.031z';

/**
 * @class Location
 * @param {Object} location
 * @param {string} location.title - The name of the location.
 * @param {Object} location.position - a LatLng object or LatLngLiteral
 * representing a point in geographical coordinates.
 */
class Location {
  constructor(location) {
    const self = this;

    self.isVisible = ko.observable(true);
    self.isSelected = ko.observable(false);

    self.marker = createAppMarker(location);
    self.infoWindow = createInfoWindow();
    setAppEvents(self.marker, self.infoWindow);
    setInfoWindow(self.marker, self.infoWindow);

    google.maps.event.addListener(self.marker, 'click', function() {
      self.toggleSelection();
    });

    self.show = function() {
      self.isVisible(true);
      self.marker.setVisible(true);
    };

    self.hide = function() {
      self.isVisible(false);
      self.marker.setVisible(false);
    };

    self.listItemOver = function(){
      google.maps.event.trigger(self.marker, 'mouseover');
    };

    self.listItemOut = function(){
      google.maps.event.trigger(self.marker, 'mouseout');
    };

    self.listItemClick = function(){
      google.maps.event.trigger(self.marker, 'click');
    };

    self.toggleSelection = function() {
      self.isSelected(self.isSelected() ? false : true);
    };
  }
}

/**
 * @class LocationsList
 */
const LocationsList = function() {
  const self = this;

  self.open = ko.observable(true);
  self.filter = ko.observable('');
  self.locations = ko.observableArray([]);

  self.mapDimensions = ko.pureComputed(function() {
    return self.open() ? "windowed" : "fullscreen";
  }, self);

  self.menuButtonPosition = ko.pureComputed(function() {
    return self.open() ? "opened" : "closed";
  }, self);
}

/**
 * @class AppViewModel
 */
const AppViewModel = function() {
  const self = this;

  self.locationsList = ko.observable(new LocationsList());

  self.toggleLocationList = function() {
    self.locationsList().open(self.locationsList().open() ? false : true);
  };

  self.clearFilter = function() {
    // Reset filter value.
    self.locationsList().filter('');
    // Display all locations.
    ko.utils.arrayForEach(self.locationsList().locations(), function(location){
      location.show();
    });
  };

  self.filterLocationList = ko.computed(function() {
    // Remove whitespace and convert to lowercase before matching.
    let searchStr = self.locationsList().filter().toLowerCase().trim();
    if (searchStr != '') {
      // Display locations that include the search string.
      ko.utils.arrayForEach(self.locationsList().locations(), function(location){
        self.includes(location, searchStr) ? location.show() : location.hide();
      });
    } else {
      self.clearFilter();
    }
  }, self);

  self.includes = function(location, str) {
    return location.marker.title.toLowerCase().includes(str);
  };

  self.addLocationToApp = function(location) {
    self.locationsList().locations.push(new Location(location));
  };

  self.loadLocations = ko.computed(function() {
    if (startLocationProcessing()) {
      defaultLocations.forEach(self.addLocationToApp);
      resizeMapBounds();
    }
  }, self);
}

ko.applyBindings(new AppViewModel());
