// setup browser env using jsdom for testing
import jsdom from "jsdom"

export default function(url) {
  global.document = jsdom.jsdom(
    "<!doctype html><html><body><div id=\"app\"></div></body></html>", {
      url,
    }
  )
  global.window = document.defaultView
  global.navigator = window.navigator
  window.localStorage = window.sessionStorage = {
    getItem: function(key) {
      return this[key]
    },
    setItem: function(key, value) {
      this[key] = value
    },
    removeItem: function(key) {
      delete this[key]
    },
  }
}
