
// Initializes the map when the page loads
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 32.8194215, lng: -97.2905449},
    zoom: 9,
    styles: [{
      featureType: "poi",
      stylers: [{ visibility: "off" }]  // Turn off points of interest.
    }, {
      featureType: "transit.station",
      stylers: [{ visibility: "off" }]  // Turn off bus stations, train stations, etc.
    }],
    disableDoubleClickZoom: true
  });
}