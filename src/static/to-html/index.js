import fs from "fs"
import path from "path"
import mkdirp from "mkdirp"

import urlAsHtml from "./url-as-html"
import filenameToUrl from "../../filename-to-url"
import * as pagesActions from "../../redux/modules/pages"

if (pagesActions.SET === undefined) {
  throw new Error("pages SET action is undefined")
}
if (pagesActions.FORGET === undefined) {
  throw new Error("pages FORGET action is undefined")
}

export function setPageData(url, uri, pagesData, store) {
  if (!pagesData[url]) {
    console.info(`No data in for url '${ url }'.`)
  }
  else {
    // prepare page data
    store.dispatch({
      type: pagesActions.SET,
      page: uri,
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
    page: uri,
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
  store,
  metadata,
  routes,
  setPageData,
  writeHTMLFile,
  forgetPageData,
}, testing) {
  // create all html files
  return Promise.all(
    urls.map((url) => {
      const uri = filenameToUrl(path.join(
        // remove / surrounding baseUrl path
        baseUrl.path.replace(/^\//, "").replace(/\/$/, ""),
        url
      ))
      const basename = path.join(destination, url)

      setPageData(url, uri, pagesData, store)
      return (
        urlAsHtml(uri, {
          routes,
          store,
          baseUrl,
          metadata,
        }, testing)
        .then((html) => writeHTMLFile(basename, html))
        .then(() => forgetPageData(uri, store))
      )
    })
  )
}

export default ({
  urls,
  baseUrl,
  destination,
  pagesData,
  routes,
  store,
  metadata,
}, testing) => (
  writeAllHTMLFiles({
    urls,
    baseUrl,
    destination,
    pagesData,
    routes,
    store,
    metadata,
    setPageData,
    writeHTMLFile,
    forgetPageData,
  }, testing)
)
