/**
 * @file Implement App's location list menu functionality.
 */

var map;

var markers = [];

var startLocationProcessing = ko.observable(false);

/**
 * @class LocationsList
 */
var LocationsList = function() {
  this.open = ko.observable(true);

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

  self.loadLocations = ko.computed(function() {
    if (startLocationProcessing()) {
      defaultLocations.forEach(addLocation);
      defaultBounds();
    }
  }, this);
}

ko.applyBindings(new AppViewModel());
