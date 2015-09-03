import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import thunk from "redux-thunk"

import * as reducers from "./ducks"

export default function(additionalReducers = {}, initialState = {}) {
  const reducer = combineReducers({
    ...reducers,
    ...additionalReducers,
  })

  function promiseMiddleware() {
    return (next) => (action) => {
      const { promise, types, ...rest } = action
      if (!promise) {
        return next(action)
      }
      else if (!promise.then) {
        throw new Error(
          "promiseMiddleware expects a promise object that implements then()"
        )
      }

      const [ REQUEST, SUCCESS, FAILURE ] = types
      next({ ...rest, type: REQUEST })
      return promise.then(
        (response) => next({ ...rest, response, type: SUCCESS }),
        (error) => next({ ...rest, error, type: FAILURE })
      )
    }
  }

  let finalCreateStore

  if (__DEVTOOLS__) {
    const { devTools, persistState } = require("redux-devtools")

    finalCreateStore = compose(
      applyMiddleware(promiseMiddleware, thunk),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      createStore
    )
  }
  else {
    finalCreateStore = applyMiddleware(promiseMiddleware, thunk)(createStore)
  }

  return finalCreateStore(reducer, initialState)
}
