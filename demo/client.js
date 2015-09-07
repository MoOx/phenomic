import statinamic from "statinamic/lib/client"

import routes from "app/routes"
import store from "app/store"

// dev index
if (__DEV__) {
  require("!!file?name=index.html!statinamic/lib/dev-index.html")
}

// all md files as JSON + generate collections
require.context("./content", true, /\.md$/)

statinamic({
  routes,
  store,
})
