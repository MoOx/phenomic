// @flow

import React from "react"
import ReactDOMserver from "react-dom/server"
import { match, RouterContext as RouterContextProvider } from "react-router"
import { Provider as ReduxContextProvider } from "react-redux"

import DefaultHtml from "../components/Html"
import pathToUri from "../_utils/path-to-uri"
import PhenomicContextProvider from "../components/ContextProvider"
import serialize from "../_utils/serialize"
import minifyCollection from "../loader/minify"

export default function(
  url: string,
  options: PhenomicStaticConfig,
  Html: Function = DefaultHtml
): Promise<string> {

  const {
    baseUrl,
    assetsFiles,
    routes,
    collection,
    metadata,
    store,
  } = options

  const render = ReactDOMserver[
    (!options.clientScripts)
    ? "renderToStaticMarkup"
    : "renderToString"
  ]

  return new Promise((resolve, reject) => {
    try {
      match(
        {
          routes,
          location: url,
          basename: baseUrl.pathname,
        },
        (error, redirectLocation, renderProps) => {
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

          const collectionMin = minifyCollection(collection)

          /* eslint-disable react/no-multi-comp */

          const renderBody = () => render(
            <PhenomicContextProvider
              collection={ collectionMin }
              metadata={ metadata }
            >
              <ReduxContextProvider store={ store }>
                <RouterContextProvider { ...renderProps } />
              </ReduxContextProvider>
            </PhenomicContextProvider>
          )

          const renderScript = () => {
            if (options.clientScripts) {
              const initialState = {
                ...store.getState(),
                // only keep current page as others are not necessary
                pages: {
                  [url]: store.getState().pages[url],
                },
              }
              const script = (
                `window.__COLLECTION__ = ${ serialize(collectionMin) };` +
                `window.__INITIAL_STATE__ = ${ serialize(initialState) }`
              )

              return (
                <script dangerouslySetInnerHTML={{ __html: script }} />
              )
            }

            return null
          }

          // write htmlString as html files
          return resolve(
            // render html document as simple html
            "<!doctype html>" +
            ReactDOMserver.renderToStaticMarkup(
              React.createElement(
                Html,
                {
                  ...assetsFiles && {
                    css: assetsFiles.css
                    ? assetsFiles.css.map(
                      (fileName) => pathToUri(baseUrl.pathname, fileName)
                    )
                    : [],
                    js: options.clientScripts && assetsFiles.js
                    ? assetsFiles.js.map(
                      (fileName) => pathToUri(baseUrl.pathname, fileName)
                    )
                    : [],
                  },
                  renderBody,
                  renderScript,
                }
              )
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
