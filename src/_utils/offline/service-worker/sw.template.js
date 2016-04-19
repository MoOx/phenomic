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
  // Only cache files within the same origin
  if (requestURL.origin == location.origin) {
    event.respondWith(
      caches
        .open(cacheName)
        .then((cache) => (
          // Try the cache
          cache
            .match(event.request)
            .then((response) => {
              const fetchPromise = fetch(event.request)
                .then((networkResponse) => {
                  // cache on demand
                  cache.put(event.request, networkResponse.clone())
                  return networkResponse
                })
              // Return from cache or start a new fetch Promise
              return response || fetchPromise
            })
        ))
        // Fallback when cache doesn't match and fetch failed
        .catch(() => {
          // Reponse with /index.html if user is trying to access a page
          if (
            requestURL.href.endsWith(".html") ||
            requestURL.href.endsWith("/")
          ) {
            return caches.match("<%=scope %>index.html")
          }

          // Other urls will received normal browser's behavior
          // like json, image, ...
        })
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
