class ThemeManager {
    static toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.applyMapTheme(newTheme);
    }

    static applyMapTheme(theme) {
        const map = WeatherMap.getMap();
        if (map) {
            const layer = theme === 'dark' ? 
                'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' :
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            
            map.eachLayer(l => l.remove());
            L.tileLayer(layer).addTo(map);
        }
    }
}