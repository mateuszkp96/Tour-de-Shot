//import {environment} from '../environments/environment'
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrAcHs0kAcdeefzPzIefUED4HnBotZJNE&libraries=geometry,places&callback=initMap";

//script.src = "https://maps.googleapis.com/maps/api/js?key="+env.googleMapApiKey+"&libraries=geometry,places&callback=initMap";

script.defer = true;
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {
  // JS API is loaded and available
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
