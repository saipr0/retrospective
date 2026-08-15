const CACHE_PREFIX = 'retrospective-archive-';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(name => name.startsWith(CACHE_PREFIX)).map(name => caches.delete(name))
      ))
      .then(() => self.clients.claim())
      .then(() => self.registration.unregister())
  );
});
