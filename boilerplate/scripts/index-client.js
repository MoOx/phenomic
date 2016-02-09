// all md files as JSON + generate collections
require.context("../content", true, /\.md$/)

// ---

import "whatwg-fetch"
import statinamicClient from "statinamic/lib/client"

import * as layouts from "layouts"
import metadata from "app/metadata"
import routes from "app/routes"
import store from "app/store"

statinamicClient({
  layouts,
  metadata,
  routes,
  store,
})
