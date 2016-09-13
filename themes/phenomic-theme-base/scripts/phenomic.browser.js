// Hot loading HRM Patch
import "react-hot-loader/patch"

// fetch polyfill
import "whatwg-fetch"

import metadata from "../src/metadata.js"
import routes from "../src/routes.js"
import store from "../src/store.js"
import phenomicClient from "phenomic/lib/client"
phenomicClient({ metadata, routes, store })

// md files processed via phenomic-loader to JSON && generate collection
const mdContext = require.context("../content", true, /\.md$/)
mdContext.keys().forEach(mdContext)

// hot loading
if (module.hot) {

  // hot load md
  const mdHotUpdater = require("phenomic/lib/client/hot-md").default
  module.hot.accept(mdContext.id, () => {
    // mdContext = require.context("../content", true, /\.md$/)
    const requireUpdate = mdHotUpdater(mdContext, window.__COLLECTION__, store)
    mdContext.keys().forEach(requireUpdate)
  })

  module.hot.accept(
    [ "../src/metadata.js", "../src/routes.js", "../src/store.js" ],
    () => phenomicClient({ metadata, routes, store })
  )
}
