import url from "url"

export default function(root, cb) {
  root.addEventListener("click", function(ev) {
    if (
      ev.altKey ||
      ev.ctrlKey ||
      ev.metaKey ||
      ev.shiftKey ||
      ev.defaultPrevented
    ) {
      return true
    }

    let anchor = null
    for (let n = ev.target; n.parentNode; n = n.parentNode) {
      if (n.nodeName === "A") {
        anchor = n
        break
      }
    }
    if (!anchor) return true
    const href = anchor.getAttribute("href")

    // Don't intercerpt anchor
    if (href.startsWith("#")) {
      return true
    }

    const u = url.parse(href)

    if (u.host && u.host !== window.location.host) return true

    ev.preventDefault()

    cb(url.resolve(window.location.pathname, u.path) + (u.hash || ""))
    return false
  })
}
