import { combineReducers } from "redux"
import createStore from "statinamic/lib/redux/createStore"
import * as statinamicReducers from "statinamic/lib/redux/modules"
import minifyCollection from "statinamic/lib/md-collection-loader/minify"
import getPage from "../../scripts/load-async"
import * as layouts from "layouts"

const store = createStore(
  combineReducers(statinamicReducers),

  // initialState
  {
    ...(typeof window !== "undefined") && window.__INITIAL_STATE__,

    // static build optimization
    ...__PROD__ && {
      collection:
        minifyCollection(require("statinamic/lib/md-collection-loader/cache")),
    },

    layouts,
    pages: {
      ...(typeof window !== "undefined") &&
      (typeof window.__INITIAL_STATE__ !== "undefined") &&
      window.__INITIAL_STATE__.pages,
      getPage,
    },
  }
)

export default store
