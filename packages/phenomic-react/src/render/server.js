import path from "path"

import React from "react"
import ReactDOMServer from "react-dom/server"
import { match, RouterContext } from "react-router"
import { createRouteFromReactElement } from "react-router/lib/RouteUtils"
import createURL from "phenomic-api-client/lib/url"

import Provider from "../components/Provider"
import createStore from "../shared/store"
import performQuery from "../shared/performQuery"
import QueryString from "../shared/QueryString"
import renderHTML from "../server/renderHTML"

const debug = require("debug")("phenomic:plugin:react")

function getMatch({ routes, location }) {
  return new Promise((resolve, reject) => {
    match({ routes, location: `/${ location }` }, (error, redirectLocation, renderProps) => {
      error
      ? reject(error)
      : resolve({ renderProps, redirectLocation })
    })
  })
}

function renderToString(store, { renderProps, redirectLocation }, renderHTML) {
  const body = ReactDOMServer.renderToString(
    <Provider fetch={ fetch } store={ store }>
      <RouterContext { ...renderProps } />
    </Provider>
  )
  return renderHTML({
    body,
    state: store.getState(),
  })
}

async function serverRender(app, fetch, location) {
  debug("server renderering")

  const routes = createRouteFromReactElement(app.routes)
  const store = createStore()
  const { renderProps, redirectLocation } = await getMatch({ routes, location })
  const containers = renderProps.components.filter(item => item && typeof item.getQueries === "function")
  await Promise.all(containers.map(item => {
    const queries = item.getQueries(renderProps)
    return performQuery(store, fetch, Object.keys(queries).map(key => QueryString.encode(queries[key])))
  }))
  const contents = await app.renderToString(store, { renderProps, redirectLocation }, renderHTML)
  const state = store.getState()
  return [
    { path: path.join(location, "index.html"), contents },
    ...Object.keys(state)
      .map(key => ({
        path: createURL({ root: "phenomic", ...QueryString.decode(key) }),
        contents: JSON.stringify(state[key].node),
      })),
  ]
}

export default serverRender
export { renderToString }
