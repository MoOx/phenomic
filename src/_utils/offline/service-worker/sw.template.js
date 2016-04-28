// https://jakearchibald.com/2014/offline-cookbook/

const cacheName = "<%= cacheName %>"

/* eslint-disable quotes */
const cacheListAsync = JSON.parse('<%= files %>')
// const cacheListSync = JSON.parse('<%= files %>')
/* eslint-enable quotes */

self.addEventListener("install", (event) => {
  console.log("[SW]:", "installing")
  event.waitUntil(
    caches.open(cacheName).then((cache) => (
      cache.addAll(cacheListAsync)
      .then(() => self.skipWaiting())
      // return cache.addAll(cacheListSync)
    ))
  )
  console.log("[SW]:", "install completed")
})

self.addEventListener("activate", (event) => {
  console.log("[SW]:", "activating")

  event.waitUntil(
    caches.keys()
    // cleanup entries that do not match the current cacheName
    .then((keys) => Promise.all(
      keys.filter((key) => key !== cacheName)
      .map((key) => caches.delete(key))
    ))
    .then(() => {
      self.clients.claim()
      console.log("[SW]:", "activate completed")
    })
  )
})

self.addEventListener("fetch", (event) => {
  const requestURL = new URL(event.request.url)

  // Only cache files within the same origin
  // @todo reconsider this, user might want to cache assets from CDN etc
  if (requestURL.origin == location.origin) {
    event.respondWith(
      caches.open(cacheName)

      // @todo add filter to decide if
      // data are essential (eg: content): network first + cache
      // data are not essential (eg: avatar): cache first + network
      // more at
      // https://github.com/MoOx/phenomic/issues/277#issuecomment-215346577

      // Try the cache
      .then((cache) => (
        cache.match(event.request)
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
