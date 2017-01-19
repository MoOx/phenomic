const React = require("react")
const Provider = require("../components/Provider")
const createStore = require("../shared/store")
const createURL = require("phenomic-api-client/lib/url")
const { match, RouterContext } = require("react-router")
const RouteUtils = require("react-router/lib/RouteUtils")
const performQuery = require("../shared/performQuery")
const QueryString = require("../shared/QueryString")
const path = require("path")

function getMatch({ routes, location }) {
  return new Promise((resolve, reject) => {
    match({ routes, location: `/${ location }` }, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error)
      }
      else {
        resolve({ renderProps, redirectLocation })
      }
    })
  })
}

function renderToString(store, { renderProps, redirectLocation }, renderHTML) {
  const ReactDOMServer = require("react-dom/server")
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
  const routes = RouteUtils.createRouteFromReactElement(app.routes)
  const store = createStore()
  const { renderProps, redirectLocation } = await getMatch({ routes, location })
  const containers = renderProps.components.filter(item => item && typeof item.getQueries === "function")
  await Promise.all(containers.map(item => {
    const queries = item.getQueries(renderProps)
    return performQuery(store, fetch, Object.keys(queries).map(key => QueryString.encode(queries[key])))
  }))
  const renderHTML = require("../server/renderHTML")
  const contents = await app.renderToString(store, { renderProps, redirectLocation }, renderHTML)
  const state = store.getState()
  return [
    { path: path.join(location, "index.html"), contents },
    ...Object.keys(state)
      .map(key => ({ path: createURL({ root: "phenomic", ...QueryString.decode(key) }), contents: JSON.stringify(state[key].node) })),
  ]
}

module.exports = serverRender
module.exports.renderToString = renderToString
