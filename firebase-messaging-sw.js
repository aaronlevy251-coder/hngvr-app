// HNGVR FCM Service Worker — STUB for Phase 3
// This file will be activated in Phase 3 when we add push notifications.
// For Phase 1, it exists as a placeholder so the file path doesn't 404.

// When Phase 3 is built, this will import Firebase Messaging and handle
// background push notifications. Today it just registers cleanly.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
