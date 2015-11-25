import { combineReducers } from "redux"
import createStore from "statinamic/lib/redux/createStore"
import * as statinamicReducers from "statinamic/lib/redux/modules"
import minifyCollection from "statinamic/lib/md-collection-loader/minify"

import * as pageComponents from "app/pageComponents"

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

    pageComponents,
  }
)

export default store
