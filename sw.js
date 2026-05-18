// HNGVR Service Worker — Phase 1
// Provides offline caching of the app shell and enables PWA install.
// Push notifications are added in Phase 3 via firebase-messaging-sw.js.

const CACHE_VERSION = 'hngvr-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/favicon-32.png',
];

// On install: precache the app shell so the app loads instantly on subsequent visits.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// On activate: clean up old caches so users don't load stale code after a deploy.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_VERSION)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// On fetch: network-first for navigation requests (so deploys go live immediately),
// cache-first for static assets (for offline + speed). Firebase requests always go to the network.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never cache Firebase, fonts, or other dynamic 3rd-party calls
  if (
    url.hostname.includes('firebaseio.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('gstatic.com')
  ) {
    return; // let the browser handle it normally
  }

  // For navigation, try network first; fall back to cache when offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((resp) => {
          // Update cache with fresh copy
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(event.request, copy));
          return resp;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match('/index.html')))
    );
    return;
  }

  // For other requests, cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request)
          .then((resp) => {
            // Only cache successful basic responses to avoid caching errors
            if (resp.ok && resp.type === 'basic') {
              const copy = resp.clone();
              caches.open(CACHE_VERSION).then((c) => c.put(event.request, copy));
            }
            return resp;
          })
          .catch(() => cached)
      );
    })
  );
});
