import { combineReducers } from "redux"
import * as statinamicReducers from "statinamic/lib/ducks"
import * as reducers from "app/ducks"
import createStore from "statinamic/lib/createStore"

// for initialState
import * as pageComponents from "app/pageComponents"

const store = createStore(
  combineReducers({
    ...statinamicReducers,
    ...reducers,
  }),
  // initialState
  {
    ...(typeof window !== "undefined") && window.__INITIAL_STATE__,

    // for static build
    // instead of using the collection.json that has been made in during build
    // we directly use the module cache responsible of the build, since it's
    // still in memory. This avoid us a fs read + handling some potential async
    // issues (since the collection.json is made by a plugin _after_ the build)
    ...__PROD__ && {
      collection:
        require("statinamic/lib/markdown-as-json-loader/cache").default,
    },

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

export default store
