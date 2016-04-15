const cacheName = "<%= cacheName %>"

/* eslint-disable quotes */
const cacheList = JSON.parse('<%= files %>')
/* eslint-enable quotes */

self.addEventListener("install", (event) => {
  console.log("[SW]:", "installing")
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => (
        cache
          .addAll(cacheList)
          // Go from install to active without waiting step
          .then(() => self.skipWaiting())
      ))
  )
  console.log("[SW]:", "install completed")
})

self.addEventListener("fetch", (event) => {
  const requestURL = new URL(event.request.url)

  if (requestURL.origin == location.origin) {
    event.respondWith(
      // Try the cache
      caches.match(event.request)
        // Fall back to network
        .then((response) => response || fetch(event.request))
        // If both fail, show a generic fallback
        .catch(() => caches.match("<%= scope %>index.html"))
    )
  }
})

self.addEventListener("activate", (event) => {
  console.log("[SW]:", "activating")

  event.waitUntil(
    caches
      .keys()
      .then(
        (keys) => Promise.all(
          keys
          .filter((key) => key !== cacheName)
          .map((key) => caches.delete(key))
        )
      )
      .then(() => {
        self.clients.claim()
      })
      .then(() => {
        console.log("[SW]:", "activate completed")
      })
  )
})
