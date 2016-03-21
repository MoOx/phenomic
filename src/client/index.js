// @flow
// App
import React from "react"
import ReactDOM from "react-dom"
import Router from "react-router/lib/Router"
import useRouterHistory from "react-router/lib/useRouterHistory"
import createBrowserHistory from "history/lib/createBrowserHistory"
import { Provider as ReduxContextProvider } from "react-redux"

import StatinamicContextProvider from "../ContextProvider"

export const browserHistory =
  typeof window !== "undefined" // just for node testing
  ? useRouterHistory(createBrowserHistory)({
    basename: process.env.STATINAMIC_PATHNAME,
  })
  : null

export default function statinamic({
  layouts,
  metadata,
  routes,
  store,
}: {
  layouts: Object,
  metadata: Object,
  routes: React$Element,
  store: Object,
}): void {
  const collection =
    (typeof window !== "undefined")
    ? window.__COLLECTION__
    : []

  ReactDOM.render(
    <StatinamicContextProvider
      collection={ collection }
      layouts={ layouts }
      metadata={ metadata }
    >
      <ReduxContextProvider store={ store }>
        <Router history={ browserHistory } routes={ routes } />
      </ReduxContextProvider>
    </StatinamicContextProvider>,
    document.getElementById("statinamic")
  )
}
