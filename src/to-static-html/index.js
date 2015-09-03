import fs from "fs"
import path from "path"
import mkdirp from "mkdirp"

import urlAsHtml from "./url-as-html"

import createStore from "../createStore"

// import collection from "../json-collection-loader/cache"

// react-router beta4
// import { createRoutes } from "react-router/lib/RouteUtils"

export default ({ urls, source, dest, exports }) => {

  const store = createStore(exports.reducers, exports.initialState)

  const routes =
  // react-router beta4
  // createRoutes(
    exports.routes
  // )

  // create all html files
  return Promise.all(
    urls.map(
      (url) => {
        const basename = path.join(dest, url)
        let data
        try {
          data = require(path.join(basename, "index"))
        }
        /* eslint-disable no-empty */
        catch (err) {
          // no
          // console.info(`No data for url '${ url }'.`)
        }
        /* eslint-enable no-empty */

        if (data) {
          // prepare page data
          store.dispatch({
            type: "PAGE_SET",
            page: url,
            response: {
              data,
            },
          })
        }

        return (
          urlAsHtml(url, { routes, store })
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
                      type: "PAGE_FORGET",
                      page: url,
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
