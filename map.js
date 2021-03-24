var nps_token = config.NPS_TOKEN;
var maps_token = config.MAPS_TOKEN;

function initMap() {
  var latitude = parseFloat(localStorage.getItem("latitude"));
  var longitude = parseFloat(localStorage.getItem("longitude"));
  var radius = localStorage.getItem("radius");
  console.log(latitude,longitude,radius);
  var place = { lat: latitude,lng: longitude};
  console.log(place);
  const map = new google.maps.Map(document.getElementById("map"), {
    center: place,
    zoom: 8,
  });
  const iconBase = "http://maps.google.com/mapfiles/kml/paddle/";
  const marker = new google.maps.Marker({
    position: place,
    icon: iconBase + "blu-stars.png",
    map: map,
  });

  /*
  const markers = locations.map((location, i) => {
    return new google.maps.Marker({
      position: location,
      icon: iconBase + "pink-blank.png",
      map: map,
    });
  });*/
}

/*
const locations = [
  { lat: 41.80, lng: -87.77 },
  { lat: 41.82, lng: -87.61 },
  { lat: 40.9, lng: -87.6 },
  { lat: 41.65, lng: -87.5 },
  { lat: 41.84, lng: -87.8 },
  { lat: 41.99, lng: -87.9 },
  { lat: 41.89, lng: -88 },
  { lat: 41.75, lng: -88.626893 },
  { lat: 41.7, lng: -87.9 },
  { lat: 41.6, lng: -87.5 },
  { lat: 42.9, lng: -87.3 },
];
*/

