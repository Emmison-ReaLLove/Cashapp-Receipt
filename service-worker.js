const CACHE_NAME = "receipt-app-v2"; // 🔥 change version when you update

const urlsToCache = [
  "/",
  "/index.html"
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting(); // 🔥 force new version immediately

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATE (delete old caches)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 🔥 remove old cache
          }
        })
      )
    )
  );

  self.clients.claim(); // 🔥 take control immediately
});

// FETCH (network first, fallback to cache)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
