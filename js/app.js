/**
 * @file Implement App's location list menu functionality.
 */

var map;

var markers = [];

var startLocationProcessing = ko.observable(false);

/**
 * @class Location
 * @param {Object} location
 * @param {string} location.title - The name of the location.
 * @param {Object} location.position - a LatLng object or
 * LatLngLiteral representing a point in geographical coordinates.
 */
class Location {
  constructor(location) {
    this.marker = createAppMarker(location);
    this.infoWindow = createInfoWindow(this.marker.title);
    this.isVisible = ko.observable(true);

    this.listItemOver = function(){
      highlightMarker(this.marker);
    };

    this.listItemOut = function(){
      unhighlightMarker(this.marker);
    };

    this.listItemClick = function(){
      singleBounceAnimation(this.marker);
      this.infoWindow.open(map, this.marker);
    };
  }
}

/**
 * @class LocationsList
 */
var LocationsList = function() {
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
var AppViewModel = function() {
  var self = this;

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
      resizeMapBounds();
    }
  }, self);
}

ko.applyBindings(new AppViewModel());
