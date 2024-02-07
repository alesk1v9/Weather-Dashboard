document.addEventListener('DOMContentLoaded', function() {
    var APIKey = '7a320e20362012e0dd7620a7f5262ea9';

// Load saved cities from local storage
var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
// Make an API call to get current conditions
// Update the content of the current conditions section
// Save the city in the list of recently searched cities
// Make an API call to get the forecast for the next 5 days

// Clear previous content
// Iterate over the data for the next 5 days
// Add information to the forecast section
formatDateTime(){
    //date/time
}
displaySavedCities(){
// Clear previous content
// Add saved cities as buttons
}
saveCity(){
// Remove city if it already exists in the list
// Add city to the beginning of the list
// Limit to 5 cities
// Remove the oldest city
// Save to local storage
// Update the display of saved cities
};

// Fetch weather for the current city
// Save the city in the recently searched list
});