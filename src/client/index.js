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
    basename: process.env.PHENOMIC_USER_PATHNAME,
  })
  : null

export default function phenomic({
  metadata,
  routes,
  store,
}: {
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
      metadata={ metadata }
    >
      <ReduxContextProvider store={ store }>
        <Router history={ browserHistory } routes={ routes } />
      </ReduxContextProvider>
    </PhenomicContextProvider>,
    document.getElementById("phenomic")
  )
}
