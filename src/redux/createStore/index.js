import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

export default function(
  reducer = {},
  initialState = {},
  extraMiddlewares = {},
  extraStoreEnhancers = {}
) {
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
        (response) => next({ ...rest, response, type: FAILURE })
      )
    }
  }

  let finalCreateStore

  if (process.env.REDUX_DEVTOOLS && process.env.CLIENT) {
    const devTools = require("../../client/DevTools").default.instrument
    const { persistState } = require("redux-devtools")

    const getDebugSessionKey = () => {
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      return (matches && matches.length > 0)? matches[1] : null
    }

    finalCreateStore = compose(
      applyMiddleware(
        promiseMiddleware,
        thunk,
        ...extraMiddlewares
      ),
      devTools(),
      persistState(getDebugSessionKey()),
      ...extraStoreEnhancers
    )(createStore)
  }
  else {
    finalCreateStore = compose(
      applyMiddleware(
        promiseMiddleware,
        thunk,
        ...extraMiddlewares
      ),
      ...extraStoreEnhancers
    )(createStore)
  }

  return finalCreateStore(reducer, initialState)
}
