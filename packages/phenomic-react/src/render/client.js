const React = require("react")
const Provider = require("../components/Provider")
const createStore = require("../shared/store")
const createURL = require("phenomic-api-client/lib/url")
const ReactDOM = require("react-dom")

function render(routes) {

  function createFetchFunction() {
    return config => fetch(createURL({ ...config, root: "/phenomic" })).then(res => res.json())
  }

  const initialStateNode = document.getElementById("Hydration")
  const store = createStore(
    initialStateNode && initialStateNode.textContent ?
      JSON.parse(initialStateNode.textContent) :
      undefined
  )

  ReactDOM.render(
    <Provider
      fetch={createFetchFunction()}
      store={store}
    >
      {routes}
    </Provider>,
    document.getElementById("PhenomicRoot")
  )
}

module.exports = render
