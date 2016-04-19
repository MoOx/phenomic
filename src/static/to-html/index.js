// @flow
import fs from "fs-promise"
import path from "path"

import debug from "debug"

import urlAsHtml from "./url-as-html"

import * as pagesActions from "../../redux/modules/pages"

if (pagesActions.SET === undefined) {
  throw new Error("pages SET action is undefined")
}
if (pagesActions.FORGET === undefined) {
  throw new Error("pages FORGET action is undefined")
}

const log = debug("phenomic:static:to-html")

export function setPageData(
  url: string,
  collection: PhenomicCollection,
  store: Object
): void {
  const json = collection.find((item) => item.__url === url)
  if (!json) {
    log(`No json in for url '${ url }'.`)
  }
  else {
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
  // forget page data to avoid having all pages data in all
  // pages
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

export function writeAllHTMLFiles({
  urls,
  baseUrl,
  destination,
  assetsFiles,
  exports,
  collection,
  store,
  setPageData,
  forgetPageData,
  writeHTMLFile,
  offline,
  offlineConfig,
}: {
  urls: Array<string>,
  baseUrl: Object,
  destination: string,
  assetsFiles: Object,
  exports: Object,
  collection: PhenomicCollection,
  store: Object,
  setPageData: Function,
  forgetPageData: Function,
  writeHTMLFile: Function,
  offline: boolean,
  offlineConfig: PhenomicOfflineConfig,
}, testing?: boolean): Promise {
  // create all html files
  return Promise.all(
    urls.map((url) => {
      const item = collection.find((item) => item.__url === url)
      const filename = item
        ? path.join(destination, item.__resourceUrl)
        : path.join(destination, url)

      setPageData(url, collection, store)
      return (
        urlAsHtml(url, {
          exports,
          collection,
          store,

          baseUrl,
          assetsFiles,
          offline,
          offlineConfig,
        }, testing)
        .then((html) => writeHTMLFile(filename, html))
        .then(() => forgetPageData(url, store))
      )
    })
  )
}

export default function(options: Object, testing?: boolean): Promise {
  return writeAllHTMLFiles({
    ...options,
    setPageData,
    forgetPageData,
    writeHTMLFile,
  }, testing)
}
