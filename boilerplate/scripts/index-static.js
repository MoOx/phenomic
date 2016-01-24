import statinamicStatic from "statinamic/lib/static"

import pkg from "../package.json"
import { routes, store } from "utils"

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
