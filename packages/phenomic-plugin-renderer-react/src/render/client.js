import "isomorphic-fetch"
import jsonFetch from "simple-json-fetch"
import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import createURL from "phenomic-api-client/lib/url"

import Provider from "../components/Provider"
import createStore from "../shared/store"

const debug = require("debug")("phenomic:plugin:react")

let store

function render(routes: () => React$Element<any>) {
  debug("client rendering")

  function createFetchFunction() {
    return (config: PhenomicQueryConfig) =>
      jsonFetch(createURL({ ...config, root: "/phenomic" })).then(
        res => res.json,
      )
  }

  const initialStateNode = document.getElementById("Hydration")
  store =
    store ||
    createStore(
      initialStateNode && initialStateNode.textContent
        ? JSON.parse(initialStateNode.textContent)
        : undefined,
    )

  ReactDOM.render(
    <AppContainer>
      <Provider fetch={createFetchFunction()} store={store}>
        {routes()}
      </Provider>
    </AppContainer>,
    document.getElementById("PhenomicRoot"),
  )
}

export default render
