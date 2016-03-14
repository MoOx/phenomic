import { createStore, applyMiddleware, compose } from "redux"

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

  const finalCreateStore = compose(
    applyMiddleware(
      promiseMiddleware,
      ...extraMiddlewares
    ),
    ...extraStoreEnhancers
  )(createStore)

  return finalCreateStore(reducer, initialState)
}
