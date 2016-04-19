// @flow
import React from "react"
import ReactDOMserver from "react-dom/server"

import { match, RouterContext as RouterContextProvider } from "react-router"
import { Provider as ReduxContextProvider } from "react-redux"
import Helmet from "react-helmet"

import importExports from "../../_utils/import-exports"
import htmlMetas from "../../_utils/html-metas"
import joinUri from "../../_utils/join-uri"
import Html from "./Html"
import PhenomicContextProvider from "../../ContextProvider"
import escapeJSONforHTML from "../../_utils/escape-json-for-html"

import minifyCollection from "../../content-loader/minify"

export default function(url: string, {
  exports,
  collection,
  store,

  baseUrl,
  assetsFiles,
  offline,
  offlineConfig,
}: {
  exports: Object,
  collection: PhenomicCollection,
  store: Object,

  baseUrl: Object,
  assetsFiles: Object,
  offline: boolean,
  offlineConfig: PhenomicOfflineConfig,
}, testing?: boolean): Promise<string> {
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
              "phenomic (static) doesn't handle redirection yet"
            )
          }
          else if (!renderProps) {
            throw new Error (
              "phenomic (static) doesn't handle page not found yet. " +
              "You are not supposed so see this message because this code is " +
              "not supposed to be executed the way thing are, so this can " +
              "be a react-router issue. Check out opened issue to find a " +
              "workaround: https://github.com/MoOx/phenomic/issues"
            )
          }
          else {
            const collectionMin = minifyCollection(collection)
            // render app body as "react"ified html (with data-react-id)
            body = render(
              <PhenomicContextProvider
                collection={ collectionMin }
                layouts={ layouts }
                metadata={ metadata }
              >
                <ReduxContextProvider store={ store }>
                  <RouterContextProvider { ...renderProps } />
                </ReduxContextProvider>
              </PhenomicContextProvider>
            )

            head = Helmet.rewind()

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

          const headTags = (
            head.base.toString() +
            defaultMetas +
            head.meta.toString() +
            head.title.toString() +
            head.link.toString()
          )

          const htmlProps = {
            lang: "en",
            ...head.htmlAttributes.toComponent(),
            ...offline && offlineConfig.appcache && {
              manifest: joinUri(baseUrl.pathname, "manifest.appcache"),
            },
          }

          const jsFiles = assetsFiles.js
          if (offline && offlineConfig.serviceWorker) {
            // We will add baseUrl later for all files in jsFiles
            jsFiles.push("sw-register.js")
          }

          const scriptTags = jsFiles.map((fileName) =>
            <script
              key={ fileName }
              src={ `${ joinUri(baseUrl.pathname, fileName) }` }
            />
          )

          // TODO: How to let's user push custom tags to the end of the array ?
          scriptTags.unshift(head.script.toComponent())

          // write htmlString as html files
          return resolve(
            // render html document as simple html
            "<!doctype html>" +
            ReactDOMserver.renderToStaticMarkup(
              React.createElement(Html, {
                htmlProps,
                head: headTags,
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
