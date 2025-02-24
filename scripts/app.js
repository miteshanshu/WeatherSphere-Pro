class WeatherApp {
    static API_KEY = 'enter your API KEY'; // Add your API key here
    static BASE_URL = 'https://api.openweathermap.org/data/2.5';

    // Start the app
    static init() {
        this.units = localStorage.getItem('unitPref') || 'metric'; // Get unit setting (Celsius or Fahrenheit)
        document.getElementById('unitToggle').checked = this.units === 'imperial'; // Set toggle based on saved unit
        this.bindEvents(); // Set up event listeners
        this.loadCachedData(); // Load saved weather data if available

        if (!navigator.onLine) this.showOfflineAlert(); // Show alert if offline
    }

    // Set up event listeners
    static bindEvents() {
        document.getElementById('unitToggle').addEventListener('change', this.toggleUnits); // Toggle units
        window.addEventListener('online', () => this.hideOfflineAlert()); // Hide offline alert when online
        window.addEventListener('offline', () => this.showOfflineAlert()); // Show alert when offline
        
        // Search when Enter is pressed in the input field
        document.getElementById('cityInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') WeatherApp.searchWeather();
        });
    }

    // Get weather data
    static async searchWeather() {
        const city = document.getElementById('cityInput').value.trim();
        if (!city) return; // Do nothing if input is empty

        this.showLoading(true); // Show loading spinner
        try {
            // Get current weather and forecast
            const [current, forecast] = await Promise.all([
                this.fetchData('weather', { q: city, units: this.units }),
                this.fetchData('forecast', { q: city, units: this.units })
            ]);
            
            this.updateUI(current, forecast); // Update UI with data
            this.renderProcessedForecast(forecast); // Show 5-day forecast
            localStorage.setItem('lastCity', city); // Save last searched city

            // Use Web Worker for forecast processing
            const worker = new Worker('scripts/workers/forecast-worker.js');
            worker.postMessage(forecast.list);
            worker.onmessage = ({ data }) => {
                this.renderProcessedForecast(data);
                worker.terminate(); // Stop worker
            };
        } catch (error) {
            this.showError(error.message); // Show error message
        } finally {
            this.showLoading(false); // Hide loading spinner
        }
    }

    // Fetch data from the weather API
    static async fetchData(endpoint, params) {
        const response = await fetch(
            `${this.BASE_URL}/${endpoint}?${new URLSearchParams(params)}&appid=${this.API_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error getting data'); // Show error if request fails
        }
        return response.json(); // Convert response to JSON
    }

    // Change temperature units
    static toggleUnits = (e) => {
        this.units = e.target.checked ? 'imperial' : 'metric';
        localStorage.setItem('unitPref', this.units); // Save unit setting
        if (document.getElementById('cityInput').value) this.searchWeather(); // Refresh weather data
    }

    // Update weather info on screen
    static updateUI(current, forecast) {
        document.getElementById('cityName').textContent = `${current.name}, ${current.sys.country}`;
        document.getElementById('weatherIcon').className = `wi wi-owm-${current.weather[0].id}`;
        document.getElementById('weatherDescription').textContent = current.weather[0].description;
        document.getElementById('temp').textContent = `${Math.round(current.main.temp)}°${this.getUnitsSymbol()}`;
        document.getElementById('humidity').textContent = current.main.humidity;
        document.getElementById('wind').textContent = `${current.wind.speed} ${this.units === 'metric' ? 'm/s' : 'mph'}`;
        document.getElementById('feelsLike').textContent = `${Math.round(current.main.feels_like)}°${this.getUnitsSymbol()}`;
        document.getElementById('pressure').textContent = current.main.pressure;
        document.getElementById('visibility').textContent = `${current.visibility / 1000} km`;
        document.getElementById('sunrise').textContent = new Date(current.sys.sunrise * 1000).toLocaleTimeString();
        document.getElementById('sunset').textContent = new Date(current.sys.sunset * 1000).toLocaleTimeString();

        this.initMap(current.coord.lat, current.coord.lon); // Show map

        const hourlyData = forecast.list.slice(0, 8); // Get next few hours' forecast
        WeatherCharts.renderHourly(hourlyData); // Show temperature chart
    }

    // Show or update map
    static initMap(lat, lon) {
        if (!this.mapInitialized) {
            WeatherMap.init(lat, lon);
            this.mapInitialized = true;
        } else {
            WeatherMap.updatePosition(lat, lon);
        }
    }

    // Show 5-day weather forecast
    static renderProcessedForecast(forecastData) {
        const forecastContainer = document.getElementById('fiveDayForecast');
        
        // Group forecast by date
        const dailyForecast = forecastData.list.reduce((acc, entry) => {
            const date = new Date(entry.dt * 1000);
            const dateKey = date.toISOString().split('T')[0];

            if (!acc[dateKey]) {
                acc[dateKey] = { date: date, entries: [] };
            }
            acc[dateKey].entries.push(entry);
            return acc;
        }, {});

        // Get midday (12 PM) forecast for each day
        const fiveDayForecast = Object.values(dailyForecast)
            .slice(0, 5)
            .map(day => day.entries.reduce((closest, entry) => {
                const entryHour = new Date(entry.dt * 1000).getHours();
                return (!closest || Math.abs(12 - entryHour) < Math.abs(12 - closest.hour)) ? 
                    { ...entry, hour: entryHour } : closest;
            }));

        // forecast section
        forecastContainer.innerHTML = fiveDayForecast.map(entry => `
            <div class="forecast-card">
                <div class="forecast-date">
                    ${new Date(entry.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })} 
                    ${new Date(entry.dt * 1000).getDate()}
                </div>
                <i class="wi wi-owm-${entry.weather[0].id} forecast-icon"></i>
                <div class="forecast-temp">
                    ${Math.round(entry.main.temp)}°${this.getUnitsSymbol()}
                </div>
                <div class="forecast-condition">
                    ${entry.weather[0].description}
                </div>
            </div>
        `).join('');
    }

    // Show or hide loading spinner
    static showLoading(show) {
        document.getElementById('loadingSpinner').style.display = show ? 'block' : 'none';
        document.getElementById('weatherCard').style.opacity = show ? 0.5 : 1;
    }

    // Show error message
    static showError(message) {
        const errorBanner = document.getElementById('errorBanner');
        errorBanner.textContent = message;
        errorBanner.classList.add('visible');
        setTimeout(() => errorBanner.classList.remove('visible'), 5000);
    }

    // Show offline alert
    static showOfflineAlert() {
        document.getElementById('offlineFallback').style.display = 'block';
    }

    // Hide offline alert
    static hideOfflineAlert() {
        document.getElementById('offlineFallback').style.display = 'none';
    }

    // Get unit symbol (°C or °F)
    static getUnitsSymbol() {
        return this.units === 'metric' ? 'C' : 'F';
    }
}

// Run the app when the page loads
document.addEventListener('DOMContentLoaded', () => WeatherApp.init());
