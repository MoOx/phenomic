import fs from "fs"
import path from "path"
import mkdirp from "mkdirp"

import debug from "debug"

import urlAsHtml from "./url-as-html"
import filenameToUrl from "../../filename-to-url"
import * as pagesActions from "../../redux/modules/pages"

if (pagesActions.SET === undefined) {
  throw new Error("pages SET action is undefined")
}
if (pagesActions.FORGET === undefined) {
  throw new Error("pages FORGET action is undefined")
}

const log = debug("statinamic:static:to-html")

export function setPageData(url, uri, pagesData, store) {
  if (!pagesData[url]) {
    log(`No data in for url '${ url }'.`)
  }
  else {
    // prepare page data
    store.dispatch({
      type: pagesActions.SET,
      page: filenameToUrl(uri),
      response: {
        data: pagesData[url],
      },
    })
  }
}

export function forgetPageData(uri, store) {
  // forget page data to avoid having all pages data in all
  // pages
  store.dispatch({
    type: pagesActions.FORGET,
    page: filenameToUrl(uri),
  })
}

export function writeHTMLFile(basename, html) {
  return new Promise((resolve, reject) => {
    mkdirp(basename, (err) => {
      if (err) {
        reject(err)
      }

      const filename = path.join(basename, "index.html")
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
  pagesData,
  assetsFiles,

  layouts,
  metadata,
  routes,
  store,

  setPageData,
  forgetPageData,
  writeHTMLFile,
}, testing) {
  // create all html files
  return Promise.all(
    urls.map((url) => {
      const uri = filenameToUrl(path.join(baseUrl.path, url))
      const basename = path.join(destination, url)

      setPageData(url, uri, pagesData, store)
      return (
        urlAsHtml(uri, {
          layouts,
          metadata,
          routes,
          store,

          baseUrl,
          assetsFiles,
        }, testing)
        .then((html) => writeHTMLFile(basename, html))
        .then(() => forgetPageData(url, store))
      )
    })
  )
}

export default ({
  pagesData,
  assetsFiles,
  urls,

  baseUrl,
  destination,

  layouts,
  metadata,
  routes,
  store,
}, testing) => (
  writeAllHTMLFiles({
    urls,
    baseUrl,
    destination,
    pagesData,
    assetsFiles,

    layouts,
    metadata,
    routes,
    store,

    setPageData,
    forgetPageData,
    writeHTMLFile,
  }, testing)
)
