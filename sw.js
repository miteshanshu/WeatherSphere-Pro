const CACHE_NAME = 'weather-v6';
const API_CACHE = 'api-data-v2';

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('openweathermap')) {
        event.respondWith(
            this.cacheFirst(event.request)
        );
    }
    // Other strategies
});

async function cacheFirst(request) {
    const cache = await caches.open(API_CACHE);
    const cached = await cache.match(request);
    return cached || fetchAndCache(request, cache);
}

async function fetchAndCache(request, cache) {
    const response = await fetch(request);
    if (response.ok) {
        cache.put(request, response.clone());
    }
    return response;
}

const MAP_CACHE = 'map-tiles-v1';

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('tile.openstreetmap.org')) {
        event.respondWith(
            caches.open(MAP_CACHE).then(cache => 
                cache.match(event.request).then(response => 
                    response || fetch(event.request).then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                )
        );
    }
});