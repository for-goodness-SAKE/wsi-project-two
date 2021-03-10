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
                var location = lat + ", "+ long;
                console.log(location);
            }
        });
    }
    function getLocation() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        }
    }
    function showPosition(position) {
        var lat =  position.coords.latitude
        var long = position.coords.longitude;
        var location = lat + ", "+ long;
    }
    var radius=document.getElementById("rad").value;
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
