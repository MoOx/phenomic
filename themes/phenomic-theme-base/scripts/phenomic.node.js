import metadata from "../web_modules/app/metadata"
import routes from "../web_modules/app/routes"
import store from "../web_modules/app/store"

import phenomicStatic from "phenomic/lib/static"

module.exports = (options) =>
  phenomicStatic({
    ...options,
    metadata,
    routes,
    store,
  })
