/**
 * @file Implement App's location list menu functionality.
 */

 // Invoke strict mode syntax.
'use strict';

let map;
let appInfoWindow;
let currentMarker;
const markers = [];
const startLocationProcessing = ko.observable(false);

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

    this.marker = createAppMarker(location);
    this.isVisible = ko.observable(true);
    this.isSelected = ko.observable(false);

    google.maps.event.addListener(this.marker, 'click', function() {
      self.toggleSelection();
    });

    this.show = function() {
      this.isVisible(true);
      this.marker.setVisible(true);
    };

    this.hide = function() {
      this.isVisible(false);
      this.marker.setVisible(false);
    };

    this.listItemOver = function(){
      google.maps.event.trigger(this.marker, 'mouseover');
    };

    this.listItemOut = function(){
      google.maps.event.trigger(this.marker, 'mouseout');
    };

    this.listItemClick = function(){
      google.maps.event.trigger(this.marker, 'click');
    };

    this.toggleSelection = function() {
      this.isSelected(this.isSelected() ? false : true);
    };
  }
}

/**
 * @class LocationsList
 */
const LocationsList = function() {
  this.open = ko.observable(true);
  this.filter = ko.observable('');
  this.locations = ko.observableArray([]);

  this.mapDimensions = ko.pureComputed(function() {
    return this.open() ? "windowed" : "fullscreen";
  }, this);

  this.menuButtonPosition = ko.pureComputed(function() {
    return this.open() ? "opened" : "closed";
  }, this);
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
      initAppInfoWindow();
      resizeMapBounds();
    }
  }, self);
}

ko.applyBindings(new AppViewModel());
