// all md files as JSON + generate collections
require.context("./content", true, /\.md$/)

// ---

import statinamicClient from "statinamic/lib/client"

import routes from "app/routes"
import store from "app/store"

statinamicClient({
  routes,
  store,
})
