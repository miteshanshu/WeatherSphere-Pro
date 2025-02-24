class WeatherMap {
    static mapInstance = null;
    static marker = null;

    static init(lat, lon) {
        this.mapInstance = L.map('weatherMap', {
            center: [lat, lon],
            zoom: 10,
            zoomControl: false,
            fadeAnimation: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: ''
        }).addTo(this.mapInstance);

        this.marker = L.marker([lat, lon], {
            icon: L.divIcon({
                className: 'weather-marker',
                html: '<i class="wi wi-thermometer"></i>',
                iconSize: [40, 40]
            })
        }).addTo(this.mapInstance);
    }

    static updatePosition(lat, lon) {
        if (this.mapInstance) {
            this.mapInstance.setView([lat, lon], 10);
            this.marker.setLatLng([lat, lon]);
        }
    }
}