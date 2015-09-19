import statinamicStatic from "statinamic/lib/static"

import routes from "app/routes"
import store from "app/store"

export default ({ urls, pagesData, dest, baseUrl }) => statinamicStatic({
  urls,
  pagesData,
  dest,
  baseUrl,
  routes,
  store,
})
