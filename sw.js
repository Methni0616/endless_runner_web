const cacheName = "bunny-runner-v1";
const assets = [
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./assets/background.png",
  "./assets/bunny1_stand.png",
  "./assets/bunny1_walk1.png",
  "./assets/bunny1_walk2.png",
  "./assets/bunny1_jump.png",
  "./assets/bunny1_hurt.png",
  "./assets/box.png",
  "./assets/spike.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== cacheName && caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
