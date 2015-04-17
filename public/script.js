$(document).ready(function() {
   $('.carousel').carousel('pause');

});


var wayfinder = [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}]
var map
var map2
var map3


function initialize() {
  var mapProp = {
    center: new google.maps.LatLng(31.648498, -40),
    zoom: 2,
    panControl: false,
    zoomControl: true,
    scaleControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: wayfinder
    };

     map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

  google.maps.event.addDomListener(window, 'load', initialize);


function initialize2(lat, lng) {
    var mapProp2 = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 11,
    panControl: false,
    zoomControl: true,
    scaleControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: wayfinder
    };

    map2 = new google.maps.Map(document.getElementById("googleMap2"), mapProp2);
}


function initialize3(lat,lng,markers) {

    var mapProp2 = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 11,
    panControl: false,
    zoomControl: true,
    scaleControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: wayfinder
    };

    map2 = new google.maps.Map(document.getElementById("googleMap3"), mapProp2);

    var infowindow = new google.maps.InfoWindow({});
    var markersObj = {};
    if (markers) {
    markers.forEach(function(item){
        console.log(item.locationName, item.locationDescription)
         var marker = new google.maps.Marker({
          position: new google.maps.LatLng(item.latitude, item.longitude),
          map: map2,
          icon: '/greypin.png'
        });
        markersObj[item.id] = marker
        var name = item.locationName
        var description = item.locationDescription
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.close();
          infowindow = new google.maps.InfoWindow({
              content: '<div id="pop-up">' + '<b>' + name + '</b>' + ":" + " " + description + '<br>'
                      // + '<a href="http://www.nytimes.com"><i class="smaller-icon glyphicon glyphicon-pencil"></i></a>'
                      + '</div>'
          });
          infowindow.open(map2, marker);
        });
      });
    }
  }


   $('.delete-button').on('click', function(e) {
      e.preventDefault();
      var delBtn = $(this);
      var myUrl = delBtn.attr('href');
      console.log(myUrl)
    $.ajax({
        method: 'DELETE',
        url: myUrl
        }).done(function() {
          delBtn.remove();
        })
      })


