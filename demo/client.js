import { combineReducers } from "redux"
import statinamic from "statinamic/lib/client"

import routes from "app/routes"
import * as statinamicReducers from "statinamic/lib/ducks"
import * as reducers from "app/ducks"
import * as pageComponents from "app/pageComponents"

import createStore from "statinamic/lib/createStore"
const store = createStore(
  // reducers
  combineReducers({
    ...statinamicReducers,
    ...reducers,
  }),
  // initialState
  {
    ...window.__INITIAL_STATE__,
    pageComponents,
  }
)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept([
    // will be be updated since it's a lib :)
    // but will still needs to be required
    // "statinamic/lib/ducks",
    "app/ducks",
  ], () => {
    store.replaceReducer(combineReducers({
      ...require("statinamic/lib/ducks"),
      ...require("app/ducks"),
    }))
  })
}

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
