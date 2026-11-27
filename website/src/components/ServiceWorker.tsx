"use client";

import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator))
      return;
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => navigator.serviceWorker.ready)
      .then(async () => {
        // Assets of the first visit load before the worker controls the page; cache them now so it works offline.
        const urls = performance
          .getEntriesByType("resource")
          .map((e) => e.name)
          .filter((u) => u.startsWith(`${location.origin}/_next/static/`));
        const cache = await caches.open("docs-v1");
        await cache.addAll([location.href, ...urls]);
      })
      .catch(() => {});
  }, []);
  return null;
}
