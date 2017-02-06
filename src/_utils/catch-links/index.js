import url from "url"

const catchLinks = (cb: Function) => (ev: any): void => {
  if (
    ev.altKey ||
    ev.ctrlKey ||
    ev.metaKey ||
    ev.shiftKey ||
    ev.defaultPrevented
  ) {
    return
  }

  let anchor = null
  for (let n = ev.target; n.parentNode; n = n.parentNode) {
    if (n.nodeName === "A") {
      anchor = n
      break
    }
  }
  if (!anchor) {
    return
  }
  const href = anchor.getAttribute("href")

  // Don't intercerpt anchor
  if (!href || href.startsWith("#")) {
    return
  }

  const u = url.parse(href)

  if (u.host && u.host !== window.location.host) {
    return
  }

  const finalUrl = url.resolve(
    window.location.pathname,
    u.path || ""
  ) + (u.hash || "")

  if (!cb(finalUrl)) {
    return
  }

  ev.preventDefault()
}

export default function(
  elements: Array<Element>,
  cb: Function
): Function {
  const eventCallback = catchLinks(cb)
  elements.map((el) => el.addEventListener("click", eventCallback))

  return () => {
    elements.map((el) => el.removeEventListener("click", eventCallback))
  }
}
