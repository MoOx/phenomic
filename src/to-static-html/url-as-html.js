import React from "react"

// react-router beta4
// import { useRoutes, RoutingContext } from "react-router"
// import createHistory from "history/lib/createMemoryHistory"
// import createLocation from "history/lib/createLocation"
import Router from "react-router"
import Location from "react-router/lib/Location"

import { Provider } from "react-redux"
import Helmet from "react-helmet"

import Html from "./Html"

export default (url, { routes, store, baseUrl }) => (
  new Promise((resolve, reject) => {
    const defaultMeta = [
      `<meta charset="utf-8" />`,
      `<meta http-equiv="X-UA-Compatible" content="IE=edge" />`,
      `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
      `<link rel="stylesheet" href="${
        baseUrl.path }/statinamic-client.css" />`,
    ].join("")

    try {
      const location = new Location("/" + url + "/")
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

          // render app body as "react"ified html (with data-react-id)
          const body = React.renderToString(
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
            </div>
          )

          const headTags = Helmet.rewind()
          const head = (
            defaultMeta +
            headTags.meta +
            `<title>${ headTags.title }</title>` +
            headTags.link
          )

          const initialState = {
            ...store.getState(),

            // only keep current page as others are not necessary
            pages: {
              [url]: store.getState().pages[url],
            },

            // skip some data \\
            // ensure collection is not in all pages output
            // async json file is prefered (file length concerns)
            collection: undefined,
            // already in bundle
            pageComponents: undefined,
          }

          // write htmlString as html files
          return resolve(
            // render html document as simple html
            "<!doctype html>" +
            React.renderToStaticMarkup(
              React.createElement(Html, {
                head,
                body,
                script: `window.__INITIAL_STATE__ = ${
                  JSON.stringify(initialState)
                }`,
                children: (
                  <script src={ baseUrl.path + "/statinamic-client.js" }>
                  </script>
                ),
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
)
