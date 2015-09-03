import React from "react"

// react-router beta4
// import { useRoutes, RoutingContext } from "react-router"
// import createHistory from "history/lib/createMemoryHistory"
// import createLocation from "history/lib/createLocation"
import Router from "react-router"
import Location from "react-router/lib/Location"

import { Provider } from "react-redux"

import Html from "./Html"

export default (url, { routes, store }) => new Promise((resolve, reject) => {

  try {
    const location = new Location(url)
    // react-router beta4
    // https://github.com/rackt/react-router/issues/1793
    // const location = createLocation(url)
    // const history = useRoutes(createHistory)({ routes })
    // history.match(
    // react-router beta3
    Router.run(
      routes,
      location,
      (error, state) => {
        if (error) {
          return reject(error)
        }

        // write htmlString as html files
        return resolve(
          // render html document as simple html
          "<!doctype html>" +
          React.renderToStaticMarkup(
            React.createElement(Html, {

              // but render app body as "react"ified html (with data-react-id)
              body: React.renderToString(
                // the wrapper is used here because the client might have the
                // devtools at the same level as the <Provider>
                // the <noscript> reflect the potential devtools element
                <div id="statinamic-container">
                  <Provider store={ store }>
                    {
                    /*
                    // react-router beta4
                    {() => <RoutingContext history={ history } { ...state } />}
                    */
                      () => <Router { ...state } />
                    }
                  </Provider>
                  <noscript></noscript>
                </div>
              ),
              store,
            })
          )
        )
      }
    )
  }
  catch (err) {
    reject(err)
  }
})
