import { combineReducers } from "redux"
import createStore from "statinamic/lib/redux/createStore"
import * as statinamicReducers from "statinamic/lib/redux/modules"

const store = createStore(
  combineReducers(statinamicReducers),
  { ...(typeof window !== "undefined") && window.__INITIAL_STATE__ },
)

export default store
