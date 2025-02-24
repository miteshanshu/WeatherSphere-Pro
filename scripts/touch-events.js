let touchStartX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    
    if (Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
            WeatherApp.searchWeather();
        } else {
            document.getElementById('cityInput').value = '';
        }
    }
});