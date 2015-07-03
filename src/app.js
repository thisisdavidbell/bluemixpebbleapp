/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Where Am I?',
  subtitle:'Fetching...'
});

// Display the Card
card.show();


// find current coords from watch/phone

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000  
};

// if call to get GPS from watch/phone succeeds, this function is called
function locationSuccess(pos) {
  var lat = pos.coords.latitude;
  var long = pos.coords.longitude;
  console.log('lat= ' + lat + ' long= ' + long);

  // create URL from coords to call out to Bluemix frontend API
  var URL = 'https://api.apim.ibmcloud.com/belldavukibmcom-dev/sb/country/countrylookup?lat=' + lat + '&long=' + long + '&client_id=813f8cd1-d850-431e-9c23-27cbec0fe1e4';

  // Use co-ordinates to be able to make the call to my API
 ajax(
  {
    url: URL,
    type: 'json'
  },
 function(data) {
  // Success!
  console.log('Successfully fetched country data!');

  // Extract data
  var town = data.town;
  var countryname = data.countryname;
  var population = data.population;
  
  // Show to user
  card.subtitle('');
  card.body('Town: ' + town + '\nCountry: ' + countryname + '\nPopulation: ' + population);
 },
  function(error) {
    // Failure!
    console.log('Failed calling Bluemix frontend API: ' + error);
  }
 ); // end of ajax call
  
}

// if call to get GPs from watch/phone fails, we call this function.
function locationError(err) {
  console.log('ERROR: Failed to get location from watch/phone (' + err.code + '): ' + err.message);
}

// Make an asynchronous request to get coords from watch/phone,
navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);


// Make the request to my API
/*ajax(
  {
    url: URL,
    type: 'json'
  },
function(data) {
  // Success!
  console.log('Successfully fetched country data!');

  // Extract data
  var town = data.town;
  var countryname = data.countryname;
  var population = data.population;

  // Always upper-case first letter of description
//  var description = data.weather[0].description;
//  description = description.charAt(0).toUpperCase() + description.substring(1);
  
  // Show to user
  card.subtitle('');
  card.body('Town: ' + town + '\nCountry: ' + countryname + '\nPopulation: ' + population);
},
  function(error) {
    // Failure!
    console.log('Failed calling Bluemix frontend API: ' + error);
  }
);

*/