function initMap() {
  const iit = { lat: 41.834819, lng: -87.626893 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: iit,
    zoom: 8,
  });
  const marker = new google.maps.Marker({
    position: iit,
    map: map,
  });

  const markers = locations.map((location, i) => {
    return new google.maps.Marker({
      position: location,
      map: map,
    });
  });
}

const locations = [
  { lat: 41.834819, lng: -87.626893 },
  { lat: 41.80, lng: -87.77 },
  { lat: 41.82, lng: -87.61 },
  { lat: 40.9, lng: -87.6 },
  { lat: 41.65, lng: -87.5 },
  { lat: 41.80, lng: -87.4 },
  { lat: 41.85, lng: -87.3 },
  { lat: 41.84, lng: -87.8 },
  { lat: 41.99, lng: -87.9 },
  { lat: 41.89, lng: -88 },
  { lat: 41.75, lng: -88.626893 },
  { lat: 41.7, lng: -87.9 },
  { lat: 41.6, lng: -87.5 },
  { lat: 42.9, lng: -87.3 },
];
