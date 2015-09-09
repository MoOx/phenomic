import { combineReducers } from "redux"
import * as statinamicReducers from "statinamic/lib/ducks"
import * as reducers from "app/ducks"
import createStore from "statinamic/lib/createStore"

// for initialState
import * as pageComponents from "app/pageComponents"

const store = createStore(
  // here we combine statinamic required reducers and your custom ones
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

    // page components are Component that will be used for page layout/type
    pageComponents,
  }
)

// webpack hot loading
if (module.hot) {
  // enable hot module replacement for reducers
  module.hot.accept([
    // "statinamic/lib/ducks",
    // will not be updated since it's a lib :)
    // but will still needs to be required

    // hot load your reducers
    "app/ducks",
  ], () => {
    const updatedReducer = combineReducers({
      // we still need to combine all reducers
      ...require("statinamic/lib/ducks"),
      ...require("app/ducks"),
    })
    store.replaceReducer(updatedReducer)
  })
}

export default store
