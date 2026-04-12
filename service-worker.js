const CACHE_NAME = "receipt-dynamic";

self.addEventListener("install", event => {
  self.skipWaiting(); // 🔥 activate immediately
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim()); // take control instantly
});

// 🔥 NETWORK FIRST (always get latest)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Update cache in background
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
