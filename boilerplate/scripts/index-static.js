import statinamicStatic from "statinamic/lib/static"

import pkg from "../package.json"
import { routes, store } from "utils"

module.exports = ({
  urls,
  pagesData,
  dest,
  baseUrl,
}) => (
  statinamicStatic({
    metadata: {
      pkg,
    },
    urls,
    pagesData,
    dest,
    baseUrl,
    routes,
    store,
  })
)
