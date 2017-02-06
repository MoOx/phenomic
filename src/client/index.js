// App
import React from "react"
import ReactDOM from "react-dom"
import { Router, useRouterHistory, applyRouterMiddleware } from "react-router"
import createBrowserHistory from "history/lib/createBrowserHistory"
import useScroll from "react-router-scroll/lib/useScroll"
import { Provider as ReduxContextProvider } from "react-redux"

import PhenomicContextProvider from "../components/ContextProvider"

import shouldUpdateScroll from "./should-update-scroll.js"

export const browserHistory =
  typeof window !== "undefined" // just for node testing
  ? useRouterHistory(createBrowserHistory)({
    // basename don't like having a trailing slash
    // https://github.com/reactjs/react-router/issues/3184
    basename: process.env.PHENOMIC_USER_PATHNAME.replace(/\/$/, ""),
  })
  : null

export default function phenomic({
  metadata,
  routes,
  store,
}: {
  metadata: Object,
  routes: React$Element<any>,
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
        <Router
          history={ browserHistory }
          routes={ routes }
          render={ applyRouterMiddleware(useScroll(shouldUpdateScroll)) }
        />
      </ReduxContextProvider>
    </PhenomicContextProvider>,
    document.getElementById("phenomic")
  )
}
