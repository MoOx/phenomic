// App
import "whatwg-fetch"

import React from "react"
import Router from "react-router"
import { Provider } from "react-redux"

import fetchJSON from "./fetchJSON"

export default function statinamic({
  routes,
  store,
}) {
  // react-router beta4
  // const history = require("history/lib/createBrowserHistory")()
  const history = require("react-router/lib/BrowserHistory").history

  let devtools = false
  if (__DEVTOOLS__) {
    const {
      DevTools,
      DebugPanel,
      LogMonitor,
    } = require("redux-devtools/lib/react")
    devtools = (
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    )
  }

  fetchJSON(`/collection.json`)
    .then(
      ({ data }) => store.dispatch({
        type: "COLLECTION_SET",
        collection: data,
      }),
      (error) => store.dispatch({
        type: "COLLECTION_ERROR",
        error,
      })
    )

  React.render(
    <div id="statinamic-container">
      <Provider store={store}>
        {() => <Router history={history} children={routes} />}
      </Provider>
      { __DEVTOOLS__ && devtools }
    </div>,
    document.getElementById("statinamic")
  )

}
