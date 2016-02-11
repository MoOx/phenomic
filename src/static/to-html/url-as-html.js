import React from "react"
import ReactDOMserver from "react-dom/server"

import { match, RouterContext as RouterContextProvider } from "react-router"
import { Provider as ReduxContextProvider } from "react-redux"
import Helmet from "react-helmet"

import htmlMetas from "../../html-metas"
import Html from "./Html"
import StatinamicContextProvider from "../../ContextProvider"
import escapeJSONforHTML from "../escapeJSONforHTML"

import minifyCollection from "../../md-collection-loader/minify"
import collectionCache from "../../md-collection-loader/cache"

export default (url, {
  layouts,
  metadata,
  routes,
  store,

  baseUrl,
  assetsFiles,
}, testing) => {
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
            // TODO add a redirect page à la "jekyll redirect plugin"
            console.error("statinamic (static) doesn't handle redirection yet")
            // body = ...
          }
          else if (renderProps) {
            const collection = minifyCollection(collectionCache)
            // render app body as "react"ified html (with data-react-id)
            body = render(
              // the wrapper is used here because the client might have the
              // devtools at the same level as the <Provider>
              // the <noscript> reflect the potential devtools element
              <div id="statinamic-container">
                <StatinamicContextProvider
                  collection={ collection }
                  layouts={ layouts }
                  metadata={ metadata }
                >
                  <ReduxContextProvider store={ store }>
                    <RouterContextProvider { ...renderProps } />
                  </ReduxContextProvider>
                </StatinamicContextProvider>
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
                escapeJSONforHTML(JSON.stringify(collection))
              };` +
              `window.__INITIAL_STATE__ = ${
                escapeJSONforHTML(JSON.stringify(initialState))
              }`
          }
          else {
            // TODO add a 404 or just throw a fucking warning ?
            // this is not supposed to happen the way things are done as I am
            // writing this (lol)
            console.error(
              "statinamic (static) doesn't handle page not found yet"
            )
            // body = ...
          }
          let scriptTags = false
          if (assetsFiles.js && Array.isArray(assetsFiles.js)) {
            scriptTags = assetsFiles.js.map(fileName =>
              <script
                key={ filename }
                src={ `${ baseUrl.path }${ fileName }` }
              ></script>
            )
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
