class WeatherCharts {
    static chartInstance = null; // Store the chart instance

    // Create or update the hourly temperature chart
    static renderHourly(data) {
        const ctx = document.getElementById('hourlyChart');

        // Remove the old chart if it exists
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        // Create a new line chart
        this.chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(entry => 
                    new Date(entry.dt * 1000).toLocaleTimeString([], { hour: '2-digit' }) // Format time as HH AM/PM
                ),
                datasets: [{
                    label: 'Temperature',
                    data: data.map(entry => entry.main.temp), // Get temperature values
                    borderColor: 'var(--primary)', // Line color
                    backgroundColor: 'rgba(33, 150, 243, 0.1)', // Light blue background
                    tension: 0.4, // Smooth curve
                    borderWidth: 2 // Line thickness
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }, // Hide legend
                    tooltip: {
                        callbacks: {
                            // Show temperature with unit in tooltip
                            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}°${WeatherApp.getUnitsSymbol()}`
                        }
                    }
                },
                scales: {
                    y: {
                        title: { text: 'Temperature', display: true }, // Label for Y-axis
                        grid: { color: 'rgba(0, 0, 0, 0.05)' } // Light grid lines
                    },
                    x: {
                        grid: { display: false } // Hide X-axis grid lines
                    }
                }
            }
        });
    }
}
