self.onmessage = function({ data }) {
    const dailyForecast = processForecastData(data);
    self.postMessage(dailyForecast);
};

function processForecastData(list) {
    const dailyData = [];
    const processedDays = new Set();
    
    list.forEach(entry => {
        const date = new Date(entry.dt * 1000);
        const dayKey = date.toLocaleDateString();
        
        if (!processedDays.has(dayKey) {
            dailyData.push({
                date: date.toLocaleDateString('en-US', { weekday: 'short' }),
                temp: Math.round(entry.main.temp),
                weatherId: entry.weather[0].id,
                description: entry.weather[0].description
            });
            processedDays.add(dayKey);
        }
    });
    
    return dailyData.slice(0, 5);
}