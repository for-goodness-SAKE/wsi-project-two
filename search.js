<<<<<<< Updated upstream
/**  
* Function to calculate current position  
* @function getLocation
*/
function getLocation() {
  if (navigator.geolocation) {
  /** Call show position function to get the coordinates */
  navigator.geolocation.getCurrentPosition(showPosition);
  }
}

/**  
* Function to get the latitude and longitude positions  
* @function showPosition
* @param {String} position position on the map
*/
function showPosition(position) {
  /** Get latitude coordinate 
  * @var {number} lat
  */
  var lat =  position.coords.latitude;   
  /** Get longitude coordinate 
  * @var {number} long
  */
  var long = position.coords.longitude;
  /** Combine both latitude and longutide 
  * @var {String} location
  */
  var location = lat + ","+ long;
  console.log(location); 
}

/**  
* Function to calculate current geo location of the user
* @function current_location
*/
function current_location(){
  /** Call show position function to get the coordinates */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
    function showPosition(position) {
      /** Get latitude coordinate */
      var lat =  position.coords.latitude;
      /** Get longitude coordinate */
      var long = position.coords.longitude;
      /** Combine both latitude and longutide */
      var location = lat + ","+ long;
      console.log(location); 
      //Call get address function to calculate address based on latitude and longitude coordinates
      getAddress(lat,long);
      /**  
      * Function to get adress from the latitude and longitude coordinates 
      * @function getAddress
      * @param {String} latitude latitude coordinate
      * @param {String} longitude longitude coordinate
      */  
      function getAddress(myLatitude,myLongitude) {
        /** Create a geocoder object from Google maps API: 
        *{@link https://maps.googleapis.com/maps/api/js}
        * @var {object} geocoder
        */
        var geocoder	= new google.maps.Geocoder();	
        /** Create a location object for latitude and longitude coordinates from Google Maps API:
        *{@link https://maps.googleapis.com/maps/api/js}
        * @var {object} location
        * @param {String} latitude latitude coordinate
        * @param {String} longitude longitude coordinate
        */
        var location	= new google.maps.LatLng(myLatitude, myLongitude);
        /** Turn coordinates into an object */
        geocoder.geocode({'latLng': location}, function (results, status) {
          /** if geocode is successful, pass the address to the location placeholder */
          if(status == google.maps.GeocoderStatus.OK) {					
            document.getElementById("loc").value= results[0].formatted_address;					
          } 
        });
      }
    }
}

/**  
* Function to calculate geo location that shows latitude and longitude positions of the based on user input for location
* @function search
*/
function search(){
  if(document.getElementById("loc").value.length == 0) {
     getLocation();
  } else {
      var geocoder = new google.maps.Geocoder();
      var address= document.getElementById("loc").value;
      geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              /** Get latitude coordinate */
              var lat = results[0].geometry.location.lat();
              /** Get longitude coordinate */
              var long= results[0].geometry.location.lng();
              /** Combine both latitude and longutide */
              var location = lat + ","+ long;
              console.log(location); 
              /** Get radius value input given by user */
              var radius=document.getElementById("rad").value;
              console.log(radius);
              /** Pass location details to results page to generate map and list results */
              localStorage.setItem("latitude", lat);
              localStorage.setItem("longitude", long);
              localStorage.setItem("radius", radius);
              /**  Call results.html page on click of search */
              window.location.href = "results.html";
          }
      });
  }
}

var expanded = false;

/**  
* Function to exapnd the checbox dropdown for activities filter
* @function showCheckboxes1
*/
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

/**  
* Function to exapnd the checbox dropdown for interests filter
* @function showCheckboxes2
*/
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

/**  
* Function to reset the inputs of filter parameters
* @function reset
*/
function reset() {
  document.getElementById("filter").reset();
}

//Pull in the activity names from the NPS API and display them as options in the drop down list
function activities() {
  const Http = new XMLHttpRequest();
  const url = 'https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=' + nps_token;
  Http.open("GET", url, false);
  Http.send(null);
  var res = Http.responseText;
  responseJson = JSON.parse(res);
  var list = (responseJson.data).length;
  for (var i = 0; i < list; i++) {
    var counter = responseJson.data[i].name;
    id =  responseJson.data[i].id;
    console.log(counter);
    console.log(id);
    
    document.getElementById("checkboxes1").innerHTML += 
              "<input type='checkbox' /> " + counter + " <br />";
     
  }
}
activities();


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

//Pull in the activity names from the NPS API and display them as options in the drop down list
function interests() {
  const Http = new XMLHttpRequest();
  const url = 'https://developer.nps.gov/api/v1/topics?topicsCode=acad&api_key=' + nps_token;
  Http.open("GET", url, false);
  Http.send(null);
  var res = Http.responseText;
  responseJson = JSON.parse(res);
  var list = (responseJson.data).length;
  for (var i = 0; i < list; i++) {
    var counter = responseJson.data[i].name;
    id =  responseJson.data[i].id;
    console.log(counter);
    console.log(id);
    
    document.getElementById("checkboxes2").innerHTML += 
              "<input type='checkbox' /> " + counter + " <br />";
     
  }
}
interests();


//Display results of National Parks
function parks() {
  const Http = new XMLHttpRequest();
  const url = 'https://developer.nps.gov/api/v1/parks?&api_key=' + nps_token;
  Http.open("GET", url, false);
  Http.send(null);
  var res = Http.responseText;
  responseJson = JSON.parse(res);
  var list = (responseJson.data).length;
  for (var i = 0; i < list; i++) {
    var fullName = responseJson.data[i].fullName;
    var id =  responseJson.data[i].id;
    var description = responseJson.data[i].description;
    var parkLink = responseJson.data[i].url;
    var latitude = responseJson.data[i].latitude;
    var longitude = responseJson.data[i].longitude;
    var latLong = responseJson.data[i].latLong;
    //console.log(fullName);
    
    //Display results
    document.getElementById("text").innerHTML += 
              "<br><p id= 'parkname'> <a href='"+parkLink+"'> <b>" + fullName + "</b> </a></p>" + 
              "<p id= 'parkdescription'> " + description + "</p>" + 
              "<p id= 'parklocation'>" + "</p>" +
              "<p id= 'parkradius'> Park Radius: " + latLong + "</p>";
    
    //Converting the Latitude and Longitude to an Address
    
    }
       
}
parks();


function reset() {
  document.getElementById("filter").reset();
}
=======
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

//Pull in the activity names from the NPS API and display them as options in the drop down list
function activities() {
  const Http = new XMLHttpRequest();
  const url = 'https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=' + nps_token;
  Http.open("GET", url, false);
  Http.send(null);
  var res = Http.responseText;
  responseJson = JSON.parse(res);
  var list = (responseJson.data).length;
  for (var i = 0; i < list; i++) {
    var counter = responseJson.data[i].name;
    var id =  responseJson.data[i].id;
    //console.log(counter);
    //console.log(id);
    
    //Display Activities as a drop down list
    document.getElementById("checkboxes1").innerHTML += 
              "<input type='checkbox' /> " + counter + " <br />";
     
  }
}
activities();


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

//Pull in the activity names from the NPS API and display them as options in the drop down list
function interests() {
  const Http = new XMLHttpRequest();
  const url = 'https://developer.nps.gov/api/v1/topics?topicsCode=acad&api_key=' + nps_token;
  Http.open("GET", url, false);
  Http.send(null);
  var res = Http.responseText;
  responseJson = JSON.parse(res);
  var list = (responseJson.data).length;
  for (var i = 0; i < list; i++) {
    var counter = responseJson.data[i].name;
    var id =  responseJson.data[i].id;
    //console.log(counter);
    //console.log(id);
    
    //Display Interests as a drop down list
    document.getElementById("checkboxes2").innerHTML += 
              "<input type='checkbox' /> " + counter + " <br />";
     
  }
}
interests();


//Display results of National Parks
function parks() {
  const Http = new XMLHttpRequest();
  const url = 'https://developer.nps.gov/api/v1/parks?&api_key=' + nps_token;
  Http.open("GET", url, false);
  Http.send(null);
  var res = Http.responseText;
  responseJson = JSON.parse(res);
  var list = (responseJson.data).length;
  for (var i = 0; i < list; i++) {
    var fullName = responseJson.data[i].fullName;
    var id =  responseJson.data[i].id;
    var description = responseJson.data[i].description;
    var parkLink = responseJson.data[i].url;
    var latitude = responseJson.data[i].latitude;
    var longitude = responseJson.data[i].longitude;
    var latLong = responseJson.data[i].latLong;
    //console.log(fullName);
    
    //Display results
    document.getElementById("text").innerHTML += 
              "<br><p id= 'parkname'> <a href='"+parkLink+"'> <b>" + fullName + "</b> </a></p>" + 
              "<p id= 'parkdescription'> " + description + "</p>" + 
              "<p id= 'parklocation'>" + "</p>";
    
    //Converting the Latitude and Longitude to an Address
    
    }
       
}
parks();


function reset() {
  document.getElementById("filter").reset();
}

>>>>>>> Stashed changes
