// @flow
import React from "react"
import ReactDOMserver from "react-dom/server"

import { match, RouterContext as RouterContextProvider } from "react-router"
import { Provider as ReduxContextProvider } from "react-redux"
import Helmet from "react-helmet"

import htmlMetas from "../../_utils/html-metas"
import pathToUri from "../../_utils/path-to-uri"
import Html from "./Html"
import PhenomicContextProvider from "../../components/ContextProvider"
import serialize from "../../_utils/serialize"

import minifyCollection from "../../loader/minify"

export default function(
  url: string,
  {
    metadata,
    routes,
    store,
    collection,

    baseUrl,
    assetsFiles,
    offline,
    offlineConfig,
  }: {
    metadata: Object,
    routes: Object,
    store: Object,
    collection: PhenomicCollection,

    baseUrl: Object,
    assetsFiles: Object,
    offline: boolean,
    offlineConfig: PhenomicOfflineConfig,
  },
  testing?: boolean
): Promise<string> {

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
                serialize(collectionMin)
              };` +
              `window.__INITIAL_STATE__ = ${
                serialize(initialState)
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
              manifest: pathToUri(baseUrl.pathname, "manifest.appcache"),
            },
          }

          const scriptTags = assetsFiles.js.map((fileName) =>
            <script
              key={ fileName }
              src={ `${ pathToUri(baseUrl.pathname, fileName) }` }
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
