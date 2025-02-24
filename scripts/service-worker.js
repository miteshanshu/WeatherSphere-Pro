const CACHE_NAME = 'weather-v5';
const OFFLINE_URL = '/offline.html';
const API_CACHE = 'api-cache-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll([
                OFFLINE_URL,
                '/styles/main.css',
                '/scripts/app.js',
                '/assets/images/offline.svg'
            ]))
    );
});

self.addEventListener('fetch', (event) => {
    // API Cache Strategy
    if (event.request.url.includes('openweathermap.org')) {
        event.respondWith(
            caches.open(API_CACHE).then(cache => 
                cache.match(event.request)
                    .then(response => response || fetch(event.request)
                    .then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
            )
        );
    }
    // Page Cache Strategy
    else if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(OFFLINE_URL))
        );
    }
    // Asset Cache Strategy
    else {
        event.respondWith(
            caches.match(event.request)
                .then(response => response || fetch(event.request))
        );
    }
});