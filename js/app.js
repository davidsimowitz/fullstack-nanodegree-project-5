/**
 * @file Implements location list menu functionality
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

var AppViewModel = function() {
  var self = this;

  self.locationsList = ko.observable(new LocationsList());

  self.toggleLocationList = function() {
    self.locationsList().open(self.locationsList().open() ? false : true);
  };
}

ko.applyBindings(new AppViewModel());