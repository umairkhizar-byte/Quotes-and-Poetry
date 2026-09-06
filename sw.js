const CACHE_NAME = "aqwal-o-ashaar-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./quotes.json",
  "./poetry.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for the JSON data (so a connected user gets the latest file
// from the repo), falling back to cache when offline.
self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  const isData = url.endsWith("quotes.json") || url.endsWith("poetry.json");

  if (isData) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
