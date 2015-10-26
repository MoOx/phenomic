import statinamicStatic from "statinamic/lib/static"

import pkg from "../package.json"
import routes from "app/routes"
import store from "app/store"

export default ({
  urls,
  pagesData,
  dest,
  baseUrl,
}) => (
  statinamicStatic({
    pkg,
    urls,
    pagesData,
    dest,
    baseUrl,
    routes,
    store,
  })
)
