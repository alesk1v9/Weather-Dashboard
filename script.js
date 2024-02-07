document.addEventListener('DOMContentLoaded', function() {
    var APIKey = '7a320e20362012e0dd7620a7f5262ea9';

    // Load saved cities from local storage
    var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

    // Display saved cities as buttons
    displaySavedCities();

    function fetchWeather(cityInput) {
        // Make an API call to get current conditions
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APIKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                // Update the content of the current conditions section
                var currentWeatherElement = document.getElementById('currentWeather');
                var temperatureCelsius = data.main.temp;
                var temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
                var windSpeed = data.wind.speed;
                var icon = data.weather[0].icon;
                var humidity = data.main.humidity;
                var currentDateTime = new Date();
                currentWeatherElement.innerHTML = `
                    <p>${formatDateTime(currentDateTime)}</p>
                    <p>Temperature: ${temperatureFahrenheit.toFixed(2)}°F</p>
                    <p>Wind: ${windSpeed} m/s</p>
                    <p>Humidity: ${humidity}%</p>
                    <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
                    <hr>
                `;

                // Save the city in the list of recently searched cities
                saveCity(cityInput);
            })
            .catch(error => console.error('Error fetching current conditions:', error));

        // Make an API call to get the forecast for the next 5 days
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${APIKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                // Clear previous content
                var forecastElement = document.getElementById('forecast');
                forecastElement.innerHTML = '';

                // Iterate over the data for the next 5 days
                for (let i = 0; i < data.list.length; i += 8) {  // Get data every 24 hours (8 data points every 3 hours)
                    var temperatureCelsius = data.list[i].main.temp;
                    var temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
                    var windSpeed = data.list[i].wind.speed;
                    var icon = data.list[i].weather[0].icon;
                    var humidity = data.list[i].main.humidity;
                    var dateTime = new Date(data.list[i].dt_txt);

                    // Add information to the forecast section
                    forecastElement.innerHTML += `
                        <p>${formatDateTime(dateTime)}</p>
                        <p>Temperature: ${temperatureFahrenheit.toFixed(2)}°F</p>
                        <p>Wind: ${windSpeed} m/s</p>
                        <p>Humidity: ${humidity}%</p>
                        <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
                        <hr>
                    `;
                }
            })
            .catch(error => console.error('Error fetching forecast:', error));
    }

    function formatDateTime(dateTime) {
        var options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return dateTime.toLocaleString('en-US', options);
    }

    function displaySavedCities() {
        var savedCitiesListElement = document.getElementById('savedCitiesList');

        // Clear previous content
        savedCitiesListElement.innerHTML = '';

        // Add saved cities as buttons
        savedCities.forEach(function(city) {
            var cityItem = document.createElement('li');
            cityItem.classList.add('list-group-item', 'cursor-pointer');
            cityItem.textContent = city;
            cityItem.addEventListener('click', function() {
                fetchWeather(city);
            });
            savedCitiesListElement.appendChild(cityItem);
        });
    }
    function saveCity(city) {
        // Remove city if it already exists in the list
        savedCities = savedCities.filter(savedCity => savedCity !== city);
    
        // Add city to the beginning of the list
        savedCities.unshift(city);
    
        // Limit to 5 cities
        if (savedCities.length > 5) {
            savedCities.pop();  // Remove the oldest city
        }
    
        // Save to local storage
        localStorage.setItem('savedCities', JSON.stringify(savedCities));
    
        // Update the display of saved cities
        displaySavedCities();
    }

// Fetch weather for the current city
// Save the city in the recently searched list
});