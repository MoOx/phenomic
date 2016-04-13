// @flow
// App
import React from "react"
import ReactDOM from "react-dom"
import { Router, useRouterHistory } from "react-router"
import createBrowserHistory from "history/lib/createBrowserHistory"
import { Provider as ReduxContextProvider } from "react-redux"

import PhenomicContextProvider from "../ContextProvider"

export const browserHistory =
  typeof window !== "undefined" // just for node testing
  ? useRouterHistory(createBrowserHistory)({
    basename: process.env.STATINAMIC_PATHNAME,
  })
  : null

export default function phenomic({
  layouts, // deprecated
  metadata,
  routes,
  store,
}: {
  layouts: Object, // deprecated
  metadata: Object,
  routes: React$Element,
  store: Object,
}): void {
  const collection =
    (typeof window !== "undefined")
    ? window.__COLLECTION__
    : []

  ReactDOM.render(
    <PhenomicContextProvider
      collection={ collection }
      layouts={ layouts } // deprecated
      metadata={ metadata }
    >
      <ReduxContextProvider store={ store }>
        <Router history={ browserHistory } routes={ routes } />
      </ReduxContextProvider>
    </PhenomicContextProvider>,
    document.getElementById("phenomic")
  )
}
