const WeatherApp = {
    init() {
        // Initialize any required event listeners
        const input = document.getElementById('cityInput');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
    },

    searchWeather() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();
        
        if (!city) {
            alert('Please enter a city name');
            return;
        }

        // Add your weather API call here
        console.log('Searching weather for:', city);
    },

    getLocation() {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('Current location:', { latitude, longitude });
                // Add your reverse geocoding or weather API call here
            },
            (error) => {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        alert('Location permission denied');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert('Location information unavailable');
                        break;
                    case error.TIMEOUT:
                        alert('Location request timed out');
                        break;
                    default:
                        alert('An unknown error occurred');
                }
            }
        );
    }
};

// Initialize the app when the document loads
document.addEventListener('DOMContentLoaded', () => WeatherApp.init());