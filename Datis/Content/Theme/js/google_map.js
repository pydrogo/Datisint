(function(){
	
"use strict";	

// When the window has finished loading create our google map below
            google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
	      // The latitude and longitude to center the map (always required)
	      // You can find it easily at http://universimmedia.pagesperso-orange.fr/geo/loc.htm	  
	      var myLatlng = new google.maps.LatLng(51.50852, -0.1254); // London
	      
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 12,
		// Disable scrollwheel zooming on the map
		scrollwheel: false,                    
                    center: myLatlng,

                    // How you would like to style the map. 
                    // This is where you would paste any style. For example paste a style found on Snazzy Maps. 
                    styles: [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#428BCA'}]},{'featureType':'landscape','stylers':[{'color':'#f2e5d4'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#c5c6c6'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#e4d7c6'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#fbfaf7'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#c5dac6'}]},{'featureType':'administrative','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'road'},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{},{'featureType':'road','stylers':[{'lightness':20}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen up in the <body>
                var mapElement = document.getElementById('map');
	      
                // Create the Google Map using out element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);
	      
	      // Put a marker at the center of the map
	      var marker = new google.maps.Marker({
      		position: myLatlng,
      		map: map,
      		title: 'We are right here!'
  		});
            }
}())