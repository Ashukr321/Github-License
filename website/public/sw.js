const CACHE = "docs-v1"; // keep in sync with src/components/ServiceWorker.tsx

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.add("/")));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const put = (req, res) => {
  if (res.ok) {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copy));
  }
  return res;
};

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;

  if (req.mode === "navigate") {
    // Network first, then the cached page, then the cached home page.
    e.respondWith(
      fetch(req)
        .then((res) => put(req, res))
        .catch(() => caches.match(req).then((r) => r || caches.match("/"))),
    );
    return;
  }

  if (/^\/(_next\/static|icons|content)\//.test(url.pathname)) {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => put(req, res))));
  }
});
