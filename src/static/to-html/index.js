// @flow

import path from "path"

import fs from "fs-promise"

import routesToUrls from "../routes-to-urls"
import urlify from "../../_utils/urlify"
// eslint-disable-next-line import/no-namespace
import * as pagesActions from "../../redux/modules/pages"

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
  {
    baseUrl,
    destination,
    assetsFiles,
    metadata,
    routes,
    store,
    collection,
    setPageData,
    forgetPageData,
    writeHTMLFile,
    offline,
    offlineConfig,
  }: {
    baseUrl: Object,
    destination: string,
    assetsFiles: Object,
    metadata: Object,
    routes: Object,
    store: Object,
    collection: PhenomicCollection,
    setPageData: Function,
    forgetPageData: Function,
    writeHTMLFile: Function,
    offline: boolean,
    offlineConfig: PhenomicOfflineConfig,
  },
  testing?: boolean
): Promise<Array<string>> {
  const urls = routesToUrls(routes, collection)

  // create all html files
  return Promise.all(
    urls.map((url) => {
      const item = collection.find((item) => item.__url === url)
      const filename = item
        ? path.join(destination, item.__resourceUrl)
        : path.join(destination, urlify(url, true))

      setPageData(url, collection, store)
      return (
        urlAsHtml(url, {
          metadata,
          routes,
          store,
          collection,

          baseUrl,
          assetsFiles,
          offline,
          offlineConfig,
        }, testing)
        .then((html) => writeHTMLFile(filename, html))
        .then((filename) => {
          forgetPageData(url, store)
          return filename
        })
      )
    })
  )
}

export default (options: Object, testing?: boolean): Promise<Array<string>> => {
  return writeAllHTMLFiles({
    ...options,
    setPageData,
    forgetPageData,
    writeHTMLFile,
  }, testing)
}
