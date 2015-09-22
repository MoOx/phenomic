import fs from "fs"
import path from "path"
import mkdirp from "mkdirp"

import urlAsHtml from "./url-as-html"
import * as pagesActions from "../ducks/pages"

if (pagesActions.SET === undefined) {
  throw new Error("pages SET action is undefined")
}
if (pagesActions.FORGET === undefined) {
  throw new Error("pages FORGET action is undefined")
}

// react-router beta4
// import { createRoutes } from "react-router/lib/RouteUtils"

export default ({ urls, pagesData, dest, routes, store, baseUrl }) => {

  // create all html files
  return Promise.all(
    urls.map(
      (url) => {
        const uri = path.join(baseUrl.path.replace(/^\//, ""), url)

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

        const basename = path.join(dest, url)

        return (
          urlAsHtml(uri, { routes, store, baseUrl })
          .then(
            (html) => {
              return new Promise((resolve, reject) => {
                const filename = path.join(basename, "index.html")
                // console.log(basename, filename)

                mkdirp(basename, (err) => {
                  // console.log("mkdir done", basename, err)
                  if (err) {
                    reject(err)
                  }

                  fs.writeFile(filename, html, (error) => {
                    // console.log("fs.writeFile done", filename, err)
                    if (error) {
                      reject(error)
                    }

                    // forget page data to avoid having all pages data in all
                    // pages
                    store.dispatch({
                      type: pagesActions.FORGET,
                      page: uri,
                    })

                    resolve(filename)
                  })
                })
              })
            }
          )
        )
      }
    )
  )
}
