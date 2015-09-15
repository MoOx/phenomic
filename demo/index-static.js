import statinamicStatic from "statinamic/lib/static"

import routes from "app/routes"
import store from "app/store"

export default ({ urls, pagesData, dest }) => {
  statinamicStatic({
    urls,
    pagesData,
    dest,
    routes,
    store,
  })
}
