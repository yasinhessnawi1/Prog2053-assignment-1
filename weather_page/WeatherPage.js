/*
    This is the main page for the weather page. It will display weather information for various cities.
 */

// Get the weather container element
const WeatherContainer = document.querySelector('.weather-container');

// calls the initCoords function when the DOM is loaded (when the page is loaded)
document.addEventListener('DOMContentLoaded', initCoords);

// Timer to update the weather every 10 minutes (600000 milliseconds)
setInterval(initCoords, 600000);

/*
    initCoords initializes the coordinates of the cities to display the weather information.
*/
function initCoords() {
    const cities = [
        { longitude: 10.7522, latitude: 59.9139, city: 'Oslo' },
        { longitude: 139.6917, latitude: 35.6895, city: 'Japan' },
        { longitude: 0.1276, latitude: 51.5074, city: 'London' },
        { longitude: -77.0369, latitude: 38.9072, city: 'Washington' },
        { longitude: 2.3522, latitude: 48.8566, city: 'Paris' },
        { longitude: 12.4964, latitude: 41.9028, city: 'Rome' },
        { longitude: 13.4050, latitude: 52.5200, city: 'Berlin' }
    ];

    for (let city of cities) {
        updateOrCreateWeatherCard(city.longitude, city.latitude, city.city);
    }
}

/*
    updateOrCreateWeatherCard updates the weather card with the given city and data.
    If the city already has a weather card, it updates the existing card.
    Otherwise, it creates a new weather card.

    @param {number} lon - The longitude of the city.
    @param {number} lat - The latitude of the city.
    @param {string} city - The name of the city.
*/
async function updateOrCreateWeatherCard(lon, lat, city) {
    const data = await fetchWeatherCardData(lon, lat);
    const existingCard = document.querySelector(`.weather-card[data-city="${city}"]`);
    if (existingCard) {
        updateWeatherCard(existingCard, city, data);
    } else {
        createWeatherCard(data, city);
    }
}

/*
    fetchWeatherCardData fetches the weather data for the given city.

    @param {number} lon - The longitude of the city.
    @param {number} lat - The latitude of the city.
    @returns {Promise} - A promise that resolves to the weather data.
*/
function fetchWeatherCardData(lon, lat) {
    return new Promise((resolve, reject) => {
        if (!WeatherContainer) {
            console.error('Weather container not found');
            reject('Weather container not found');
            return;
        }
        // Use AJAX to retrieve the data (this code is from the internet)(https://www.geeksforgeeks.org/how-to-make-ajax-call-from-javascript/)
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                console.error('Error:', xhr.status);
                reject('Error: ' + xhr.status);
            }
        };
        xhr.onerror = function () {
            console.error('Request error');
            reject('Request error');
        };
        xhr.send();
    });
}

/*
    updateWeatherCard updates the weather card with the given city and data.

    @param {HTMLElement} card - The weather card to update.
    @param {string} city - The name of the city.
    @param {object} data - The weather data to display.
*/
function updateWeatherCard(card, city, data) {
    card.innerHTML = `
        <div class="weather-card-header">
            <span class="weather-span">City:</span>
            <h2 class="weather-data">${city}</h2>
            <span class="weather-span">Longitude:</span>
            <h2 class="weather-data">${data.longitude}</h2>
            <span class="weather-span">Latitude:</span>
            <h2 class="weather-data">${data.latitude}</h2>
            <span class="weather-span">Time Zone:</span>
            <p class="weather-data">${data.timezone}</p>
        </div>
        <div class="weather-card-body">
            <span class="weather-span">Last updated:</span>
            <time class="weather-data">${data.current_weather.time}</time>
            <span class="weather-span">Temperature:</span>
            <h3 class="weather-data">${data.current_weather.temperature}${data.current_weather_units.temperature}</h3>
            <span class="weather-span">Wind Speed:</span>
            <p class="weather-data">${data.current_weather.windspeed}${data.current_weather_units.windspeed}</p>
            <span class="weather-span">Wind Direction:</span>
            <p class="weather-data">${data.current_weather.winddirection}${data.current_weather_units.winddirection}</p>
        </div>
    `;
}

/*
    createWeatherCard creates a new weather card with the given city and data.

    @param {object} data - The weather data to display.
    @param {string} city - The name of the city.
*/
function createWeatherCard(data, city) {
    const weatherCard = document.createElement('div');
    weatherCard.className = 'weather-card';
    weatherCard.setAttribute('data-city', city);
    WeatherContainer.appendChild(weatherCard);
    updateWeatherCard(weatherCard, city, data);
}
