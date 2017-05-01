//globlal variable 
var map;
var infowindow;
var service;
var input;  
var marker;
var Loca;
var pageM="0";
// here is some function that try to solve the problem of Goole map do not shows correctly
//$(document).on("pageshow", "#pagemap",  function(){
//    document.write('<script type="text/javascript" src="js/nearby.js"</script>');
//// $.mobile.changePage("javascript:location.reload()");
////    window.parent.bottom.location.reload(); 
////    window.location="#pagemap";
////    window.location.reload(); 
////      href="javascript:location.reload()";
//    
//     console.log(pageM+"pageM1");
//    if(pageM=="0"){
//        window.location.reload(); 
//        pageM="1";
//        console.log(pageM+"pageM2");
//    } 
//    return pageM;
//});

//when click button "find where am I"
$(document).on("click", "#myPosition", myPosition);

function initMap() {
    //initialise googel map
    var defaultLat=52.195593;
    var defaultLng=-2.244000000000028;
    var pyrmont =   {lat: defaultLat, lng: defaultLng};
    //get value from google map search field
    var input = $('#searchTextField')[0];
    var options = {
      // bounds: defaultBounds,
      type: ['']
    };
    //every code about Google maps was getting from goole maps API official site
    
    //https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
    //search the place, then show this place in the center of map
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    map = new google.maps.Map($('#map')[0], {
          zoom: 16,
          center: pyrmont,
    }); 
    //https://developers.google.com/maps/documentation/javascript/markers
    //create a maeker in the center of map
    marker= new google.maps.Marker({
        position:pyrmont,
        map: map,
        draggable:true,
        label:"A"
    });
    //post value to complete function
    complete(autocomplete);
    //find nearby restaurant
    searchNearby(pyrmont);
}

function myPosition(){
      
      if(navigator.geolocation){ 
          //if device support navigator plugs-in, go on
          getPosition();
        }else{ 
            //if device do not support grolocation plug-in, then shows message
//        console.log("Your browser does not support Geolocation!");   
            createMessage("Your browser does not support Geolocation!");
        }   
}
function complete(autocomplete){
    //https://developers.google.com/maps/documentation/javascript/events?hl=fr
    //when place changed call function
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        $('#rList').empty();
        var lat = autocomplete.getPlace().geometry.location.lat();
        var lng = autocomplete.getPlace().geometry.location.lng();
        var myLatLng={lat: lat, lng: lng};
//        console.log(myLatLng);
        //set map center
        map.setCenter(myLatLng);
        //create a new marker in the center
        var marker=new google.maps.Marker({position: myLatLng, map: map,
             label:"A"});
        //https://developers.google.com/maps/documentation/javascript/infowindows
        //initialise information window of place
        infowindow = new google.maps.InfoWindow();
        //https://developers.google.com/maps/documentation/javascript/places
        //initialise information of place
        service = new google.maps.places.PlacesService(map);
        // search nearby and call callback function
        service.nearbySearch({
            location: myLatLng,
            radius: '500',
            type: ['restaurant']
        }, callback);
    });
}
function searchNearby(pyrmont){
    //https://developers.google.com/maps/documentation/javascript/infowindows
    //initialise information window of place
     infowindow = new google.maps.InfoWindow();
    //https://developers.google.com/maps/documentation/javascript/places
    //initialise information of place
     service = new google.maps.places.PlacesService(map);
     service.nearbySearch({
         location: pyrmont,
         radius: '500',
         type: ['restaurant']
     }, callback);
 }    
function getPosition() {	
//    var locationOptions = { 
//        maximumAge: 10000, 
//        timeout: 6000, 
//        enableHighAccuracy: true 
//    };
    //a message to remind user is getting position.
//    console.log("getMyPosition");
    createMessage("Getting position..");
    //this code learned from mobile development lecture
    //if get position success call function successPosition, if not call function locationError
    navigator.geolocation.getCurrentPosition(successPosition,locationError);   
}
function successPosition(position){
     $('#rList').empty();
//    console.log("positionOK");
    createMessage("Get position success!");
    //set the position got as a new variable
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    Loca= {lat: latitude, lng: longitude};
//    Loca = new google.maps.LatLng(latitude, longitude);  
//    console.log(Loca);
    //set this new variable position in the center of map
    map.setCenter(Loca);
    //create a new marker
    marker=new google.maps.Marker({position: Loca, map: map,label:"B"});
    searchNearby(Loca);
    //set inforwindow to remind user's position
    infowindow.setContent('<span style="padding: 0px; text-align:left" align="left"><h4>You Are Here!!</h4></span>'); 
    //close infowindow
    infowindow.close(map, marker);
    //open infowindow
    infowindow.open(map, marker);
    
}
function locationError(error){
    createMessage("Error");
    //if device can not get position, then shows error message
    switch(error.code) {
        case error.TIMEOUT:
//            console.log("A timeout occured! Please try again!");
            createMessage("A timeout occured! Please try again!");
            break;
        case error.POSITION_UNAVAILABLE:
//            console.log('We can\'t detect your location. Sorry!');
            createMessage("We can\'t detect your location. Sorry!");
            break;
        case error.PERMISSION_DENIED:
//            console.log('Please allow geolocation access for this to work.');
            createMessage("Please allow geolocation access for this to work.");
            break;
        case error.UNKNOWN_ERROR:
            console.log('An unknown error occured!');
            createMessage("An unknown error occured!");
            break;
    }
}
function callback(results, status) {
    //clean list 
    
    restaurantNo=1;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
         markeplace=results;
        for (var i = 0; i < results.length; i++) {
            //function to create a marker for every restaurant nearby 
            createMarker(results[i]);
        }
    }
}
function createMarker(place) {
    var placeLoc = place.geometry.location;
    // create a new marker
    var markers = new google.maps.Marker({
        map: map,
        title: place.title ,
        position: placeLoc,
    });
    //when click one of markers call this function 
    google.maps.event.addListener(markers, 'click', function() {
        
        service.getDetails(place, function(result, status) {
            infowindow.setContent('<span style="padding: 0px; text-align:left" align="left"><h4>'+result.name+'</h4></span><span style="padding: 0px; text-align:left" align="left"><h5>'+result.vicinity+'</h5></span>');
            // show detail information about restaurant name and location in infowindow
            infowindow.open(map, markers);
        });     
    });
//    console.log(place);
    //once create a marker for restaurant, then call this function, and post variable of place
            upDataRestaurant(place);
      
    
}
function upDataRestaurant(place){
      
           
//             console.log(place);
//   
    
        //add the name of this place to the list, and give a list number
        $('#rList').append("<li style='padding:20px;margin:0px;'><a data-role='button' class='onReview' id='R"+checkR+"' > " + place.name +"</a></li>");
            
    //counter plus one
            checkR++;
        
    
   
        
}   
    