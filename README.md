# WeatherSphere Pro - Intelligent Weather Platform

WeatherSphere Pro is a modern, intelligent weather platform designed to provide real-time weather updates, forecasts, and visualizations. Built with a focus on user experience, it offers a sleek interface, responsive design, and offline support. Whether you're checking the current weather or planning for the week ahead, WeatherSphere Pro has you covered.

## Features
- **Real-Time Weather Data:** Get up-to-date weather information for any city worldwide.
- **5-Day Forecast:** Plan ahead with a detailed 5-day weather forecast.
- **Interactive Map:** Visualize weather conditions on an interactive map.
- **Hourly Temperature Chart:** View temperature trends over the next 24 hours.
- **Unit Conversion:** Switch between Celsius and Fahrenheit with a single click.
- **Offline Support:** Access cached weather data when offline.
- **Social Sharing:** Share weather reports with friends and family.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **APIs:** OpenWeatherMap API
- **Libraries:**
  - Leaflet.js for interactive maps
  - Chart.js for data visualization
  - Weather Icons for weather-related icons
- **Progressive Web App (PWA):** Offline support and caching with service workers

## Installation

### Clone the Repository:
```bash
git clone https://github.com/miteshanshu/WeatherSphere-Pro.git
cd WeatherSphere-Pro
```

### Open the Project:
Open the `index.html` file in your browser to view the application.

### API Key:
Replace the `API_KEY` in `app.js` with your own OpenWeatherMap API key:
```javascript
static API_KEY = 'your-api-key-here';
```

### Run Locally:
You can use a local server (e.g., Live Server in VS Code) to run the project.

## Usage
- **Search for a City:** Enter the city name in the search bar and press Enter or click the search button.
- **Use Current Location:** Click the GPS button to fetch weather data based on your current location.
- **Toggle Units:** Switch between Celsius and Fahrenheit using the unit toggle.
- **View Forecast:** Scroll down to see the 5-day forecast and hourly temperature chart.
- **Share Weather:** Click the "Share Weather Report" button to share the current weather conditions.

## File Structure
```
WeatherSphere-Pro/
├── index.html              # Main HTML file
├── styles/                 # CSS styles
│   ├── main.css            # Main stylesheet
│   └── theme.css           # Theme-specific styles
├── scripts/                # JavaScript files
│   ├── app.js              # Main application logic
│   ├── charts.js           # Chart rendering logic
│   ├── map.js              # Map rendering logic
│   ├── search.js           # Search functionality
│   └── theme.js            # Theme management
├── manifest.json           # PWA manifest file
└── assets/                 # Static assets
```

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeatureName`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeatureName`
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
- OpenWeatherMap for providing the weather data API.
- Leaflet.js for the interactive map.
- Chart.js for the data visualization.
- Weather Icons for the weather icons.

## Contact
For any questions or feedback, feel free to reach out:

- **Email:** miteshanshu1@gmail.com
- **GitHub:** [miteshanshu](https://github.com/miteshanshu)
