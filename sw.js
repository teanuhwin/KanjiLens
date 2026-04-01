const CACHE = 'kanji-lens-v1';
const ASSETS = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=DM+Mono:wght@300;400&family=Shippori+Mincho:wght@400;500;600&display=swap',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
  'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/build/kuromoji.js',
  'https://unpkg.com/wanakana@5.3.1/umd/wanakana.min.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      // Cache what we can; skip failures gracefully
      return Promise.allSettled(ASSETS.map(url => cache.add(url)));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // For CDN resources (tesseract trained data, kuromoji dict), cache aggressively
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        // Cache CDN requests
        if (
          e.request.url.includes('cdn.jsdelivr.net') ||
          e.request.url.includes('unpkg.com') ||
          e.request.url.includes('fonts.googleapis.com') ||
          e.request.url.includes('fonts.gstatic.com') ||
          e.request.url.includes('tesseract')
        ) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => cached || new Response('Offline', { status: 503 }));
    })
  );
});
