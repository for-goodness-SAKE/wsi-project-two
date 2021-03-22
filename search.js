var nps_token = config.NPS_TOKEN;
var maps_token = config.MAPS_TOKEN;

function getLocation() {
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
  }
}
function showPosition(position) {
  var lat =  position.coords.latitude
  var long = position.coords.longitude;
  var location = lat + ","+ long;
  console.log(location); 
}

function current_location(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
    function showPosition(position) {
      var lat =  position.coords.latitude
      var long = position.coords.longitude;
      var location = lat + ","+ long;
      console.log(location); 
      getAddress(lat,long);
      function getAddress(myLatitude,myLongitude) {
        var geocoder	= new google.maps.Geocoder();							// create a geocoder object
        var location	= new google.maps.LatLng(myLatitude, myLongitude);
        		// turn coordinates into an object
        geocoder.geocode({'latLng': location}, function (results, status) {
          if(status == google.maps.GeocoderStatus.OK) {						// if geocode success
            document.getElementById("loc").value= results[0].formatted_address;					// if address found, pass to processing function
          } 
        });
      }
    }
}

function search(){
  if(document.getElementById("loc").value.length == 0) {
     getLocation();
  } else {
      var geocoder = new google.maps.Geocoder();
      var address= document.getElementById("loc").value;
      geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              var lat = results[0].geometry.location.lat();
              var long= results[0].geometry.location.lng();
              var location = lat + ","+ long;
              console.log(location); 
              var radius=document.getElementById("rad").value;
              console.log(radius);
             /* var globalvariable={
                latitude: lat,
                longitude: long,
                radius: radius
              }*/
              localStorage.setItem("latitude", lat);
              localStorage.setItem("longitude", long);
              localStorage.setItem("radius", radius);
              window.location.href = "results.html";
          }
      });
  }
}

var expanded = false;

function showCheckboxes1() {
var checkboxes = document.getElementById("checkboxes1");
if (!expanded) {
  checkboxes.style.display = "block";
  expanded = true;
} else {
  checkboxes.style.display = "none";
  expanded = false;
}
}

function showCheckboxes2() {
  var checkboxes = document.getElementById("checkboxes2");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function reset() {
  document.getElementById("filter").reset();
}

