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


/*
// Calling in the NPS APIs - Option 1 -- Not pulling in the correct information, undefined

const Http = new XMLHttpRequest();
const a = 'https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=' + nps_token;
Http.open("GET", a);


//const a = 'https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=' + nps_token;

Http.onreadystatechange=(e)=> {
  for(var i = 0; i < a.length; i++) {

    var row = document.createElement('input');
    row.type = "checkbox";
    row.value = document.createTextNode(a[i].name);
    checkboxDiv = document.getElementById("checkboxes1");
    checkboxDiv.appendChild(row);
    
    console.log(a[i].name)
    console.log(Http.responseText)
}}

Http.send();
*/


/*
// Calling in the NPS APIs - Option 2 - brought up the CORS error
const url = 'https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=' + nps_token;

let myRequest = new XMLHttpRequest();
myRequest.onreadystatechange = function() {
  if (myRequest.readyState == 4 && myRequest.status == 200) {
      let a = JSON.parse(myRequest.responseText);
      let list = document.createElement('ul');
          for(var i = 0; i < a.length; i++) {
              console.log(a[i]);
              var row = document.createElement('li');
              row.id = a[i].data.id;
              var cellproduct = document.createElement('li');
              var protext = document.createTextNode(a[i].data.name);
              cellproduct.appendChild(protext);
              row.appendChild(cellproduct);
              list.appendChild(row);
          }
              document.getElementById('checkboxes1').appendChild(list);
          }
          };

          myRequest.open('GET', "'https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=' + nps_token");
          myRequest.send();
*/

/*
// Calling in the NPS APIs - Option 3
// api url 
const api_url =  
      "'https://developer.nps.gov/api/v1/activities?activitiesCode=acad&api_key=' + nps_token"; 
  
// Defining async function 
async function getapi(url) { 
    
    // Storing response 
    const response = await fetch(url); 
    
    // Storing data in form of JSON 
    var data = await response.json(); 
    console.log(data); 
    if (response) { 
      for(var i = 0; i < api_url.length; i++) {
        var row = document.createElement('input');
        row.type = "checkbox";
        row.value = document.createTextNode(api_url[i].name);
        checkboxDiv = document.getElementById("checkboxes1");
        checkboxDiv.appendChild(row);
        
        console.log(data)
  
    }
    
    show(data); 
} 
// Calling that async function 
getapi(api_url); 
}

*/