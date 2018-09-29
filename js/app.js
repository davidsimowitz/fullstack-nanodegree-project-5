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
    this.marker = createMarker(location);
    this.isVisible = ko.observable(true);

    singleBounceWhenClicked(this.marker);
    addMarker(this.marker);
    markers.push(this.marker);
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
    self.locationsList().locations().push(new Location(location));
  };

  self.loadLocations = ko.computed(function() {
    if (startLocationProcessing()) {
      defaultLocations.forEach(self.addLocationToApp);
      defaultBounds();
    }
  }, this);
}

ko.applyBindings(new AppViewModel());
