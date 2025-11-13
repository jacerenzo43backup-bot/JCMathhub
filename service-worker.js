
const CACHE_NAME = 'jcmath-v3.4';
const FILES_TO_CACHE = [
  '/index.html',
  '/manifest.json',
  '/icon.png'
];
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});
self.addEventListener('fetch', (evt) => {
  evt.respondWith(caches.match(evt.request).then((resp) => {
    return resp || fetch(evt.request);
  }));
});
