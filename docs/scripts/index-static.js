import statinamicStatic from "statinamic/lib/static"

import pkg from "../package.json"
import routes from "app/routes"
import store from "app/store"

module.exports = (options) => (
  statinamicStatic({
    ...options,
    routes,
    store,
    metadata: {
      pkg,
    },
  })
)
