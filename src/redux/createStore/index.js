import { createStore, applyMiddleware, compose } from "redux"

import promiseMiddleware from "../middlewares/promise"

export default function(
  reducer: Object = {},
  initialState: any = {},
  extraMiddlewares: any = {},
  extraStoreEnhancers: any = {}
): Function {
  const finalCreateStore = compose(
    applyMiddleware(
      promiseMiddleware,
      ...extraMiddlewares
    ),
    ...extraStoreEnhancers
  )(createStore)

  return finalCreateStore(reducer, initialState)
}
