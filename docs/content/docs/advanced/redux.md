---
title: Advanced usage of Redux
incomplete: true
---

## Enabling Redux devtools

Just start your dev server with the env var "REDUX_DEVTOOLS=1".

## Adding custom Redux reducers

Here is an example of a store that will allow you to add
with your own reducers, _with support of hot loading_.

It is based on the default boilerplate and add (and combine) your custom
reducers.

```js
import { combineReducers } from "redux"
import createStore from "statinamic/lib/redux/createStore"
import * as statinamicReducers from "statinamic/lib/redux/modules"
import * as reducers from "app/redux"

const store = createStore(
  // here we combine statinamic required reducers and your custom ones
  combineReducers({
    ...statinamicReducers,
    ...reducers,
  }),
  { ...(typeof window !== "undefined") && window.__INITIAL_STATE__ },
)

// webpack hot loading
if (module.hot) {
  // enable hot module replacement for reducers
  module.hot.accept([
    // "statinamic/lib/redux/modules",
    // will not be updated since it's a lib :)
    // but will still needs to be required

    // hot load your reducers
    "app/redux/modules",
  ], () => {
    const updatedReducer = combineReducers({
      // we still need to combine all reducers
      ...require("statinamic/lib/redux/modules"),
      ...require("app/redux/modules"),
    })
    store.replaceReducer(updatedReducer)
  })
}

export default store
```
## Adding custom middlewares and store enhancers to Redux store

`statinamic/lib/redux/createStore` accepts two extra parameters that
allow you to pass custom middlewares and store enhancers

Here is an example of adding
[redux-logger](https://github.com/fcomb/redux-logger) and
[redux-search](https://github.com/treasure-data/redux-search)
to Redux store

```js
import { combineReducers } from "redux"
import createStore from "statinamic/lib/redux/createStore"
import * as statinamicReducers from "statinamic/lib/redux/modules"
import { reducer as searchReducer, reduxSearch } from "redux-search"
import createLogger from "redux-logger"

const extraMiddlewares = { createLogger() }
const extraStoreEnhancers = {
  reduxSearch({
    resourceIndexes: {
      books: ['author', 'title']
    },
    resourceSelector: (resourceName, state) => {
      return state.resources.get(resourceName)
    }
  })
}

const store = createStore(
  combineReducers({
    ...statinamicReducers,
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
