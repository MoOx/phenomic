// App
import "whatwg-fetch"

import React from "react"
import ReactDOM from "react-dom"
import Router from "react-router"
import { Provider } from "react-redux"

import fetchJSON from "../fetchJSON"

export default function statinamic({
  routes,
  store,
}) {
  let devtools = false
  if (__DEVTOOLS__) {
    const {
      DevTools,
      DebugPanel,
      LogMonitor,
    } = require("redux-devtools/lib/react")
    devtools = (
      <DebugPanel top right bottom>
        <DevTools store={ store } monitor={ LogMonitor } />
      </DebugPanel>
    )
  }

  fetchJSON(`/statinamic/collection.json`)
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

  const history = require("history/lib/createBrowserHistory")()

  ReactDOM.render(
    <div id="statinamic-container">
      <Provider store={ store }>
        <Router history={ history } routes={ routes } />
      </Provider>
      { __DEVTOOLS__ && devtools }
    </div>,
    document.getElementById("statinamic")
  )

}
