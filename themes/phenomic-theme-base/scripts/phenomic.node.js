import metadata from "../src/metadata.js"
import routes from "../src/routes.js"
import store from "../src/store.js"
import phenomicStatic from "phenomic/lib/static"

module.exports = (options) =>
  phenomicStatic({ ...options, metadata, routes, store })
