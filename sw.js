const CACHE_NAME = 'music-player-cache';
const assetsToCache = [
    'index.html',
    'style.css',
    'audio/song1.mp3',
    'audio/song2.mp3',
    'https://via.placeholder.com/300x300?text=Song+One',
    'https://via.placeholder.com/300x300?text=Song+Two'
];

// Cache assets during the install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(assetsToCache))
    );
});

// Fetch from cache first, fallback to network if not cached
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
