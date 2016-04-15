if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(
    "<%= scope %>sw.js",
    { scope: "<%= scope %>" }
  )
  .then(function(req) {
    console.log("[SW]:", "register succeed with scope:" + req.scope)
  })
  .catch(function(error) {
    console.log("[SW]:", "failed to register sw")
    throw error
  })
}
