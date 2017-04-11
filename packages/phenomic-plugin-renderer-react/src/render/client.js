import React from "react"
import ReactDOM from "react-dom"
import createURL from "phenomic-api-client/lib/url"

import Provider from "../components/Provider"
import createStore from "../shared/store"

const debug = require("debug")("phenomic:plugin:react")

function render(routes: () => React$Element<any>) {
  debug("client renderering")

  function createFetchFunction() {
    return (config: PhenomicQueryConfig) =>
      fetch(createURL({ ...config, root: "/phenomic" })).then(res => res.json())
  }

  const initialStateNode = document.getElementById("Hydration")
  const store = createStore(
    initialStateNode && initialStateNode.textContent ?
      JSON.parse(initialStateNode.textContent) :
      undefined
  )

  ReactDOM.render(
    <Provider
      fetch={ createFetchFunction() }
      store={ store }
    >
      { routes }
    </Provider>,
    document.getElementById("PhenomicRoot")
  )
}

export default render
