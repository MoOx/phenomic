import fs from "fs-extra"
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

const log = debug("statinamic:static:to-html")

export function setPageData(url, collection, store) {
  const data = collection.find((item) => item.__url === url)
  if (!data) {
    log(`No data in for url '${ url }'.`)
  }
  else {
    // prepare page data
    store.dispatch({
      type: pagesActions.SET,
      page: url,
      response: { data },
    })
  }
}

export function forgetPageData(url, store) {
  // forget page data to avoid having all pages data in all
  // pages
  store.dispatch({
    type: pagesActions.FORGET,
    page: url,
  })
}

export function writeHTMLFile(filename, html) {
  return new Promise((resolve, reject) => {
    fs.mkdirs(path.dirname(filename), (err) => {
      if (err) {
        reject(err)
      }

      fs.writeFile(filename, html, (error) => {
        if (error) {
          reject(error)
        }

        resolve(filename)
      })
    })
  })
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
  appcache,
}, testing) {
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
          appcache,
        }, testing)
        .then((html) => writeHTMLFile(filename, html))
        .then(() => forgetPageData(url, store))
      )
    })
  )
}

export default (options, testing) => (
  writeAllHTMLFiles({
    ...options,
    setPageData,
    forgetPageData,
    writeHTMLFile,
  }, testing)
)
