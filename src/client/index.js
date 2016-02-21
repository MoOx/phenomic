// App
import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"
import { Provider as ReduxContextProvider } from "react-redux"

import StatinamicContextProvider from "../ContextProvider"

export default function statinamic({
  layouts,
  metadata,
  routes,
  store,
}) {
  let devtools = false
  if (process.env.REDUX_DEVTOOLS && process.env.CLIENT) {
    const DevToolsComponent = require("./DevTools.js").DevToolsComponent
    devtools = <DevToolsComponent store={ store } />
  }

  ReactDOM.render(
    <div id="statinamic-container">
      <StatinamicContextProvider
        collection={ typeof window !== "undefined" && window.__COLLECTION__ }
        layouts={ layouts }
        metadata={ metadata }
      >
        <ReduxContextProvider store={ store }>
          <Router history={ browserHistory } routes={ routes } />
        </ReduxContextProvider>
      </StatinamicContextProvider>
      { process.env.REDUX_DEVTOOLS && process.env.CLIENT && devtools }
    </div>,
    document.getElementById("statinamic")
  )

}
