import React from "react"
import ReactDOMserver from "react-dom/server"

import { match, RouterContext as RouterContextProvider } from "react-router"
import { Provider as ReduxContextProvider } from "react-redux"
import Helmet from "react-helmet"

import importExports from "../../_utils/import-exports"
import htmlMetas from "../../_utils/html-metas"
import joinUri from "../../_utils/join-uri"
import Html from "./Html"
import StatinamicContextProvider from "../../ContextProvider"
import escapeJSONforHTML from "../../_utils/escape-json-for-html"

import minifyCollection from "../../md-collection-loader/minify"

export default (url, {
  exports,
  collection,
  store,

  baseUrl,
  assetsFiles,
  appcache,
}, testing) => {
  const {
    layouts,
    metadata,
    routes,
  } = importExports(exports)

  const render = ReactDOMserver[
    !testing
    ? "renderToString"
    : "renderToStaticMarkup"
  ]

  return new Promise((resolve, reject) => {
    const defaultMetas = htmlMetas({
      baseUrl,
      css: assetsFiles.css,
    }).join("")

    try {
      match(
        {
          routes,
          location: url,
          basename: baseUrl.pathname,
        },
        (error, redirectLocation, renderProps) => {
          let head
          let body
          let script

          if (error) {
            return reject(error)
          }
          else if (redirectLocation) {
            // TODO add a redirect page à la "jekyll redirect plugin"
            throw new Error (
              "statinamic (static) doesn't handle redirection yet"
            )
          }
          else if (!renderProps) {
            throw new Error (
              "statinamic (static) doesn't handle page not found yet"
            )
          }
          else {
            const collectionMin = minifyCollection(collection)
            // render app body as "react"ified html (with data-react-id)
            body = render(
              // the wrapper is used here because the client might have the
              // devtools at the same level as the <Provider>
              // the <noscript> reflect the potential devtools element
              <div id="statinamic-container">
                <StatinamicContextProvider
                  collection={ collectionMin }
                  layouts={ layouts }
                  metadata={ metadata }
                >
                  <ReduxContextProvider store={ store }>
                    <RouterContextProvider { ...renderProps } />
                  </ReduxContextProvider>
                </StatinamicContextProvider>
                { process.env.REDUX_DEVTOOLS && <noscript /> }
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
            }
            script =
              `window.__COLLECTION__ = ${
                escapeJSONforHTML(JSON.stringify(collectionMin))
              };` +
              `window.__INITIAL_STATE__ = ${
                escapeJSONforHTML(JSON.stringify(initialState))
              }`
          }
          let scriptTags = false
          if (assetsFiles.js && Array.isArray(assetsFiles.js)) {
            scriptTags = assetsFiles.js.map(fileName =>
              <script
                key={ fileName }
                src={ `${ joinUri(baseUrl.pathname, fileName) }` }
              ></script>
            )
          }
          // Add appcache manifest to html tag
          const manifest =
            (appcache && appcache !== "")
            ? joinUri(baseUrl.pathname, "manifest.appcache")
            : ""
          // write htmlString as html files
          return resolve(
            // render html document as simple html
            "<!doctype html>" +
            ReactDOMserver.renderToStaticMarkup(
              React.createElement(Html, {
                head,
                body,
                script,
                manifest,
                children: scriptTags,
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
