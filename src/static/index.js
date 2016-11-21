// @flow

import path from "path"

import fs from "fs-promise"

import urlify from "../_utils/urlify"
// eslint-disable-next-line import/no-namespace
import * as pagesActions from "../redux/modules/pages"

import routesToUrls from "./routes-to-urls"
import urlAsHtml from "./url-as-html"

if (pagesActions.SET === undefined) {
  throw new Error("pages SET action is undefined")
}
if (pagesActions.FORGET === undefined) {
  throw new Error("pages FORGET action is undefined")
}

export function setPageData(
  url: string,
  collection: PhenomicCollection,
  store: Object
): void {
  const json = collection.find((item) => item.__url === url)
  if (json) {
    // prepare page data
    store.dispatch({
      type: pagesActions.SET,
      page: url,
      response: { json },
    })
  }
}

export function forgetPageData(
  url: string,
  store: Object
): void {
  // forget page data to avoid having all pages data in all pages
  store.dispatch({
    type: pagesActions.FORGET,
    page: url,
  })
}

export function writeHTMLFile(
  filename: string,
  html: string
): Promise<string> {
  return fs.mkdirs(path.dirname(filename))
    .then(() => Promise.all([
      fs.writeFile(filename, html),
    ]))
    .then(() => filename)
}

export function writeAllHTMLFiles(
  options: PhenomicStaticConfig & {
    Html: Function,
    setPageData: Function,
    forgetPageData: Function,
    writeHTMLFile: Function,
  },
  testing?: boolean
): Promise<Array<string>> {
  const {
    routes,
    collection,
    destination,
    store,
    Html,
    setPageData,
    forgetPageData,
    writeHTMLFile,
  } = options
  const urls = routesToUrls(routes, collection)

  // create all html files
  return Promise.all(
    urls.map((url) => {
      const item = collection.find((item) => item.__url === url)
      const filename = decodeURIComponent(
        item
        ? path.join(destination, item.__resourceUrl)
        : path.join(destination, urlify(url, true))
      )
      setPageData(url, collection, store)
      return (
        urlAsHtml(url, options, Html, testing)
        .then((html) => writeHTMLFile(filename, html))
        .then((filename) => {
          forgetPageData(url, store)
          return filename
        })
      )
    })
  )
}

export default (
  options: Object, // should be PhenomicStaticConfig
  testing?: boolean
): Promise<Array<string>> => {
  return writeAllHTMLFiles({
    ...options,
    setPageData,
    forgetPageData,
    writeHTMLFile,
  }, testing)
}
