/* google maps -----------------------------------------------------*/
var citymap = {};

citymap[10] = {
  center: new google.maps.LatLng(42.3001, -71.2189),
  population: 2714856
};
citymap[1] = {
  center: new google.maps.LatLng(42.3101, -71.2389),
  population: 8405837
};
citymap[2] = {
  center: new google.maps.LatLng(42.3101, -71.1589),
  population: 3857799
};
citymap[3] = {
  center: new google.maps.LatLng(42.3201, -71.2189),
  population: 603502
};
citymap[4] = {
  center: new google.maps.LatLng(42.4001, -71.2489),
  population: 603502
};
citymap[5] = {
  center: new google.maps.LatLng(42.3401, -71.2289),
  population: 603502
};
citymap[6] = {
  center: new google.maps.LatLng(42.3401, -71.1389),
  population: 603502
};
citymap[7] = {
  center: new google.maps.LatLng(42.3601, -71.1289),
  population: 603502
};
citymap[8] = {
  center: new google.maps.LatLng(42.3601, -71.2089),
  population: 603502
};
citymap[9] = {
  center: new google.maps.LatLng(42.3701, -71.2489),
  population: 603502
};


var cityCircle;
var marker;
var flightPlanCoordinates =[];
var flightPath;

function initialize() {

  // Create the map.
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(42.3601, -71.1889),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Construct the circle for each value in citymap.
  // Note: We scale the area of the circle based on the population.
  var i = 0, firstData;
  for (var city in citymap) {
    
    marker = new google.maps.Marker({
      position: citymap[city].center,
      map: map,
      draggable:true,
      animation: google.maps.Animation.DROP,
      title: 'Hello World!',
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
    //console.log(marker[city]);
    addBounce(marker,city);
    if (i === 0){
      firstData = citymap[city].center;
    }
    flightPlanCoordinates[i++] = citymap[city].center;
  }
  flightPlanCoordinates[i++] = firstData;

  console.log(flightPlanCoordinates);
  /*
  flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
  
  */
}

function addBounce(marker,city){
  var message = ['chicago', 'newyork', 'losangeles', 'vancouver'];
  var infowindow = new google.maps.InfoWindow({
    content: city
  });

  google.maps.event.addListener(marker, 'click', function() {
    console.log("inside click");
    //marker.setAnimation(google.maps.Animation.BOUNCE);
    infowindow.open(marker.get('map'), marker);
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    attackerPayoff = attackerPayoff - 30;
    updateParticles(city);
    //toggleBounce();
  });

  google.maps.event.addListener(marker, 'dbclick', function() {
    console.log("inside double click");
    marker.setAnimation(google.maps.Animation.DROP);
    //toggleBounce();
  });
}

function toggleBounce() {
    flightPath.setMap(null);
    console.log(flightPath);
  
}

google.maps.event.addDomListener(window, 'load', initialize);
