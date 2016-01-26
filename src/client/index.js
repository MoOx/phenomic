// App
import React from "react"
import ReactDOM from "react-dom"
import Router, { browserHistory } from "react-router"
import { Provider } from "react-redux"

import fetchJSON from "../fetchJSON"
import MetadataProvider from "../MetadataProvider"
import {
  set as collectionSet,
  error as collectionError,
} from "../redux/modules/collection"

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

  // Don't fetch collection
  // when it is already bundled in HTML
  const collection = store.getState().collection
  if (collection.length === 0) {
    const baseUrl = __BASE_URL__
    fetchJSON(`${ baseUrl.pathname }collection.json`)
      .then(
        ({ data }) => store.dispatch(collectionSet(data)),
        (error) => store.dispatch(collectionError(error))
      )
  }

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
