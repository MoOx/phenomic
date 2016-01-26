// App
import React from "react"
import ReactDOM from "react-dom"
import Router, { browserHistory } from "react-router"
import { Provider } from "react-redux"

import fetchJSON from "../fetchJSON"
import MetadataProvider from "../MetadataProvider"

export default function statinamic({
  metadata,
  routes,
  store,
}) {
  let devtools = false
  if (__DEVTOOLS__) {
    const DevToolsComponent = require("./DevTools.js").default
    devtools = <DevToolsComponent store={ store } />
  }

  const baseUrl = __BASE_URL__
  fetchJSON(`${ baseUrl.pathname }collection.json`)
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

  ReactDOM.render(
    <div id="statinamic-container">
      <MetadataProvider metadata={ metadata }>
        <Provider store={ store }>
          <Router history={ browserHistory } routes={ routes } />
        </Provider>
      </MetadataProvider>
      { __DEVTOOLS__ && devtools }
    </div>,
    document.getElementById("statinamic")
  )

}
