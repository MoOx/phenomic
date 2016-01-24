---
title: Advanced usage of Redux
incomplete: true
---

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

// for initialState
import * as layouts from "layouts"

const store = createStore(
  // here we combine statinamic required reducers and your custom ones
  combineReducers({
    ...statinamicReducers,
    ...reducers,
  }),

  // initialState
  {
    ...(typeof window !== "undefined") && window.__INITIAL_STATE__,

    // static build optimization
    ...__PROD__ && {
      collection:
        require("statinamic/lib/md-collection-loader/cache").default,
    },

    layouts,
  }
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
