/**
 * @file Implements and modifies map using Google Maps API
 */

var map;

var locations = [
    {title: 'Chez Moi', position: {lat: 40.690802, lng: -73.995652}},
    {title: 'Buttermilk Channel', position: {lat: 40.675994, lng: -73.999231}},
    {title: 'Brooklyn Farmacy & Soda Fountain', position: {lat: 40.684007, lng: -73.999293}},
    {title: 'Nargis Bar & Grill', position: {lat: 40.677882, lng: -73.979215}},
    {title: 'Taheni', position: {lat: 40.677399, lng: -73.983384}},
    {title: 'Miriam', position: {lat: 40.68014, lng: -73.9777}},
    {title: 'Lucali', position: {lat: 40.681803, lng: -74.000309}},
    {title: "Juliana's", position: {lat: 40.702736, lng: -73.993448}},
    {title: 'My Little Pizzeria', position: {lat: 40.690244, lng: -73.992335}},
    {title: 'Smashburger', position: {lat: 40.689692, lng: -73.979974}},
    {title: 'Shake Shack', position: {lat: 40.692123, lng: -73.988607}},
    {title: 'Shake Shack', position: {lat: 40.703053, lng: -73.994004}},
    {title: 'Shake Shack', position: {lat: 40.682638, lng: -73.976782}},
    {title: 'Dinosaur Bar-B-Que', position: {lat: 40.677625, lng: -73.98407}},
    {title: 'Watty & Meg', position: {lat: 40.685629, lng: -73.994596}},
    {title: 'Bacchus', position: {lat: 40.686961, lng: -73.98427}},
    {title: 'Prime Meats', position: {lat: 40.677168, lng: -73.998167}},
    {title: 'Verde Cafe on Smith', position: {lat: 40.684423, lng: -73.992157}},
    {title: "Caputo's Bake Shop", position: {lat: 40.682863, lng: -73.995513}},
    {title: 'Mazzola Bakery', position: {lat: 40.683307, lng: -73.99968}},
    {title: 'Ladybird Bakery', position: {lat: 40.664266, lng: -73.980696}},
    {title: 'Häagen-Dazs® Ice Cream Shop', position: {lat: 40.694675, lng: -73.994699}},
    {title: 'Ample Hills Creamery', position: {lat: 40.678857, lng: -73.9872}},
    {title: 'Ample Hills Creamery', position: {lat: 40.694557, lng: -74.000631}},
    {title: 'The Chocolate Room', position: {lat: 40.684753, lng: -73.994412}},
    {title: 'The Chocolate Room', position: {lat: 40.681202, lng: -73.977011}}
  ];

var markers = [];

/**
 * @description Creates a new Marker object from a location
 */
var createMarker = function(location) {
  var marker = new google.maps.Marker({
    position: location.position,
    title: location.title
  });
  markers.push(marker);
}

/**
 * @description Adds a Marker object to the map
 */
var addMarker = function(marker) {
  marker.setMap(map);
}

/**
 * @description Sets map bounds to include default markers
 */
var defaultBounds = function() {
  var bounds = new google.maps.LatLngBounds();
  markers.forEach(function(marker) {
    bounds.extend(marker.position);
  });
  map.fitBounds(bounds);
}

/**
 * @description Initializes Map
 */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.690753, lng: -73.995638},
    zoom: 15
  });

  locations.forEach(createMarker);
  markers.forEach(addMarker);
  defaultBounds();
}

/**
 * @description Alerts user if Google Maps API does not load
 */
function mapError() {
  alert("the map is currently unavailable");
}
