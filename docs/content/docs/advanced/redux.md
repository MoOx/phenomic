---
title: Advanced usage of Redux
incomplete: true
---

## Adding custom Redux reducers

Here is an example of a store that will allow you to add
your own reducers, _with hot loading support_. It is based on the
phenomic-theme-base.

```js
import { combineReducers } from "redux"
import createStore from "phenomic/lib/redux/createStore"
import * as phenomicReducers from "phenomic/lib/redux/modules"
import * as reducers from "app/redux"

const store = createStore(
  // here we combine phenomic required reducers and your custom ones
  combineReducers({
    ...phenomicReducers,
    ...reducers,
  }),
  { ...(typeof window !== "undefined") && window.__INITIAL_STATE__ },
)

// webpack hot loading
if (module.hot) {
  // enable hot module replacement for reducers
  module.hot.accept([
    // "phenomic/lib/redux/modules",
    // will not be updated since it's a lib :)
    // but will still needs to be required

    // hot load your reducers
    "app/redux/modules",
  ], () => {
    const updatedReducer = combineReducers({
      // we still need to combine all reducers
      ...require("phenomic/lib/redux/modules"),
      ...require("app/redux/modules"),
    })
    store.replaceReducer(updatedReducer)
  })
}

export default store
```
## Adding custom middlewares and store enhancers to Redux store

`phenomic/lib/redux/createStore` accepts two extra parameters that
allow you to pass custom middlewares and store enhancers.

Here is an example of adding
[redux-logger](https://github.com/fcomb/redux-logger) and
[redux-search](https://github.com/treasure-data/redux-search)
to Redux store:

```js
import { combineReducers } from "redux"
import createStore from "phenomic/lib/redux/createStore"
import * as phenomicReducers from "phenomic/lib/redux/modules"
import { reducer as searchReducer, reduxSearch } from "redux-search"
import createLogger from "redux-logger"

const extraMiddlewares = [ createLogger() ]
const extraStoreEnhancers = [
  reduxSearch({
    resourceIndexes: {
      books: ['author', 'title']
    },
    resourceSelector: (resourceName, state) => {
      return state.resources.get(resourceName)
    }
  })
]

const store = createStore(
  combineReducers({
    ...phenomicReducers,
    ...{
      search: searchReducer
    }
  }),
  { ...(typeof window !== "undefined") && window.__INITIAL_STATE__ },
  extraMiddlewares,
  extraStoreEnhancers,
)

export default store
```
