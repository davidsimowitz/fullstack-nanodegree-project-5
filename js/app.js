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
    this.marker = createAppMarker(location);
    this.isVisible = ko.observable(true);

    this.listItemOver = function(){
      google.maps.event.trigger(this.marker, 'mouseover');
    };

    this.listItemOut = function(){
      google.maps.event.trigger(this.marker, 'mouseout');
    };

    this.listItemClick = function(){
      google.maps.event.trigger(this.marker, 'click');
    };
  }
}

/**
 * @class LocationsList
 */
const LocationsList = function() {
  this.open = ko.observable(true);
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
