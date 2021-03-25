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


/**  
* Function to pull in the activity names from the NPS API and display them as options in the drop down list
* @function activities
*/
function activities() {
  /** Get activity data from NPS API */
  const Http = new XMLHttpRequest();
  const url = 'https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=' + nps_token;
  Http.open("GET", url, false);
  Http.send(null);
  var res = Http.responseText;
  responseJson = JSON.parse(res);
  var list = (responseJson.data).length;
  for (var i = 0; i < list; i++) {
    var counter = responseJson.data[i].name; /** Get activity name from NPS API */
    id =  responseJson.data[i].id; /** Get activity id from NPS API */
    //console.log(counter);
    //console.log(id);
    /** Display activity names in dropdown as checkboxes*/
    document.getElementById("checkboxes1").innerHTML +=   
              "<input type='checkbox' id='"+id+"' value = '"+counter+"'/>" + counter + " <br />";
  }
}
activities();

/** Get the checked checkbox values for activities */
document.getElementById("checkboxes1").addEventListener('change', function() {
  var activities = document.getElementById("checkboxes1").querySelectorAll('input[type="checkbox"]:checked');
  var i=0;
  var activity_name;
  var activity_id;
  for (var checkbox1 of activities) {
    if (checkbox1.checked)
    i+= 1;
    activity_id = checkbox1.id;   
    activity_name = checkbox1.value;
    //console.log(activity_id); /** Get checked activity id*/
    //console.log(activity_name); /** Get checked activity name*/

    activitiesFilter(activity_id); //Pass the selected activity id to the activitiesFilter function

    }
    if(i>0){
      document.getElementById("selection1").textContent = i + " selected"; /** Display selected number*/
    }else{
      document.getElementById("selection1").textContent = "Select Activities"; /** Display original text if nothing is checked*/
    }
});

/**  
* Function to pull in the interests names from the NPS API and display them as options in the drop down list
* @function interests
*/
function interests() {
  /** Get interests data from NPS API */
  const Http = new XMLHttpRequest();
  const url = 'https://developer.nps.gov/api/v1/topics?topicsCode=acad&api_key=' + nps_token;
  Http.open("GET", url, false);
  Http.send(null);
  var res = Http.responseText;
  responseJson = JSON.parse(res);
  var list = (responseJson.data).length;
  for (var i = 0; i < list; i++) {
    var counter = responseJson.data[i].name; /** Get interests name from NPS API */
    id =  responseJson.data[i].id; /** Get interests id from NPS API */
    //console.log(counter);
    //console.log(id);

    /** Display interests names in dropdown as checkboxes*/
    document.getElementById("checkboxes2").innerHTML += 
              "<input type='checkbox' id='"+id+"' value = '"+counter+"'/>" + counter + " <br />";
  }
}
interests();

/** Get the checked checkbox values for interests */
document.getElementById("checkboxes2").addEventListener('change', function() {
  var interests = document.getElementById("checkboxes2").querySelectorAll('input[type="checkbox"]:checked');
  var j=0;
  var interests_name;
  var interests_id;
  for (var checkbox2 of interests) {
    if (checkbox2.checked){
    j+= 1;
    interests_id = checkbox2.id;
    interests_name = checkbox2.value;
    //console.log(interests_id); /** Get checked interests id*/
    //console.log(interests_name); /** Get checked interests name */

    interestFilter(interests_id); //Pass the selected interest id to the interestFitler function

    }

    }
    if(j>0){
      document.getElementById("selection2").textContent = j + " selected"; /** Display selected number*/
    }else{
      document.getElementById("selection2").textContent = "Select Interests"; /** Display original text if nothing is checked*/
    }
});

/**  
* Function to create an Interest filter. If the checkbox(es) for Interests are selected, then display the park results with those attributes.
* @function activitiesFilter
* @param {String} activity_id Activity id 
*/
function activitiesFilter(activity_id) {
  /** Get ParkInformation such as park name, park description and park links from NPS API */
  const Http = new XMLHttpRequest();
  const url = 'https://developer.nps.gov/api/v1/parks?&api_key=' + nps_token;
  Http.open("GET", url, false);
  Http.send(null);
  var res = Http.responseText;
  responseJson = JSON.parse(res);
  var list = (responseJson.data).length;
  for (var i = 0; i < list; i++) {
    var fullName = responseJson.data[i].fullName; /** Get Parkname*/
    var id =  responseJson.data[i].id; /** Get Parkid*/
    var description = responseJson.data[i].description; /** Get Parkdescription*/
    var parkLink = responseJson.data[i].url; /** Get Park url that redirects to NPS website*/
    var latitude = responseJson.data[i].latitude; /** Get Park latitude coordinate*/
    var longitude = responseJson.data[i].longitude; /** Get Park longitude coordinate*/
    var state = responseJson.data[i].states; /** Get Park location - state*/

    /** Filter #1 - If certain activities are selected, only display the results that have that attribute. */
    var activitiesList = responseJson.data[i].activities.length; /** Get activities list for each state park*/
    for (var j = 0; j < activitiesList; j++) {
      var activityId =  responseJson.data[i].activities[j].id; /** Get activities id for each state park*/

      var activitiesCheckbox = document.getElementById("checkboxes1").querySelectorAll('input[type="checkbox"]:checked');
      for (var checkbox1 of activitiesCheckbox) {
        if ((checkbox1.checked) && (activityId === activity_id)) {
            /** Display list results that shows park information with corresponding activity ID*/
              document.getElementById("text").innerHTML += 
                        "<br><p id= 'parkname'> <a href='"+ parkLink+"'> <b>" + fullName + "</b> </a></p>" + 
                        "<p id= 'parkdescription'> " + description + "</p>"
                        + "<p id= 'parklocation'><b> State: </b>" + state +"</p>";
            }
            
        }
                
      }

    }
   
}
activitiesFilter();


/**  
* Function to create an Interest filter. If the checkbox(es) for Interests are selected, then display the park results with those attributes.
* @function interestFilter
* @param {String} interests_id Interests id 
*/
function interestFilter(interests_id) {

   /** Get ParkInformation such as park name, park description and park links from NPS API */
   const Http = new XMLHttpRequest();
   const url = 'https://developer.nps.gov/api/v1/parks?&api_key=' + nps_token;
   Http.open("GET", url, false);
   Http.send(null);
   var res = Http.responseText;
   responseJson = JSON.parse(res);
   var list = (responseJson.data).length;
   for (var i = 0; i < list; i++) {
    var fullName = responseJson.data[i].fullName; /** Get Parkname*/
    var id =  responseJson.data[i].id; /** Get Parkid*/
    var description = responseJson.data[i].description; /** Get Parkdescription*/
    var parkLink = responseJson.data[i].url; /** Get Park url that redirects to NPS website*/
    var latitude = responseJson.data[i].latitude; /** Get Park latitude coordinate*/
    var longitude = responseJson.data[i].longitude; /** Get Park longitude coordinate*/
    var state = responseJson.data[i].states; /** Get Park location - state*/

    /** Filter #2 - If certain interests are selected, only display the results that have that attribute. */
    var interestsList = responseJson.data[i].topics.length; /** Get topics/interests list for each state park*/
    for (var j = 0; j < interestsList; j++) {
      var interestId =  responseJson.data[i].topics[j].id; /** Get topics/interests id for each state park*/

      var interestsCheckbox = document.getElementById("checkboxes2").querySelectorAll('input[type="checkbox"]:checked');
      for (var checkbox2 of interestsCheckbox) {
        if ((checkbox2.checked) && (interestId === interests_id)) {
            /** Display list results that shows park information with corresponding interest ID*/
              document.getElementById("text").innerHTML += 
                        "<br><p id= 'parkname'> <a href='"+ parkLink+"'> <b>" + fullName + "</b> </a></p>" + 
                        "<p id= 'parkdescription'> " + description + "</p>"
                        + "<p id= 'parklocation'><b> State: </b>" + state +"</p>";
            }
            
        }
                
      }
}
}

interestFilter();
