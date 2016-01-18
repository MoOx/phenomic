import React from "react"
import ReactDOMserver from "react-dom/server"

import { match, RoutingContext } from "react-router"

import { Provider } from "react-redux"
import Helmet from "react-helmet"

import htmlMetas from "../../html-metas"
import Html from "./Html"
import MetadataProvider from "../../MetadataProvider"
import escapeJSONforHTML from "../escapeJSONforHTML"

export default (url, { metadata, routes, store, baseUrl }, testing) => {
  const render = ReactDOMserver[
    !testing
    ? "renderToString"
    : "renderToStaticMarkup"
  ]
  return new Promise((resolve, reject) => {
    const defaultMetas = htmlMetas("static", { baseUrl }).join("")
    try {
      match(
        {
          routes,
          location: "/" + url + "/",
        },
        (error, redirectLocation, renderProps) => {
          let head
          let body
          let script

          if (error) {
            return reject(error)
          }
          else if (redirectLocation) {
            // TODO: add a redirect page à la "jekyll redirect plugin"
            console.error("statinamic (static) doesn't handle redirection yet")
            // body = ...
          }
          else if (renderProps) {
            // render app body as "react"ified html (with data-react-id)
            body = render(
              // the wrapper is used here because the client might have the
              // devtools at the same level as the <Provider>
              // the <noscript> reflect the potential devtools element
              <div id="statinamic-container">
                <MetadataProvider metadata={ metadata }>
                  <Provider store={ store }>
                    <RoutingContext { ...renderProps } />
                  </Provider>
                </MetadataProvider>
              </div>
            )

            const headTags = Helmet.rewind()
            head = (
              defaultMetas +
              headTags.meta +
              headTags.title +
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
            script = `window.__INITIAL_STATE__ = ${
              escapeJSONforHTML(JSON.stringify(initialState))
            }`
          }
          else {
            // TODO: add a 404 or just throw a fucking warning ?
            // this is not supposed to happen the way things are done as I am
            // writing this (lol)
            console.error(
              "statinamic (static) doesn't handle page not found yet"
            )
            // body = ...
          }

          // write htmlString as html files
          return resolve(
            // render html document as simple html
            "<!doctype html>" +
            ReactDOMserver.renderToStaticMarkup(
              React.createElement(Html, {
                head,
                body,
                script,
                children: (
                  <script src={ `${ baseUrl.path }statinamic-client.js` }>
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
}
