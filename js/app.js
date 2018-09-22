/**
 * @file Implements location list menu functionality
 */

var locationsList = {
  open : ko.observable(true),
  toggleLocationList: function() {
    this.open(this.open() ? false : true);
  }
};

locationsList.mapDimensions = ko.pureComputed(function() {
  return this.open() ? "windowed" : "fullscreen";
}, locationsList);

locationsList.menuButtonPosition = ko.pureComputed(function() {
  return this.open() ? "opened" : "closed";
}, locationsList);

ko.applyBindings(locationsList);
