import statinamic from "statinamic/lib/client"

import routes from "app/routes"
// import * as reducers from "app/ducks"
import * as pageComponents from "app/pageComponents"

// dev index
if (__DEV__) {
  require("!!file?name=index.html!statinamic/lib/dev-index.html")
}

// all md files as JSON + generate collections
require.context("./content", true, /\.md$/)

statinamic({
  routes,
  // reducers,
  initialState: {
    ...window.__INITIAL_STATE__,
    pageComponents,
  },
})
