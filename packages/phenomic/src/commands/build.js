import path from "path"

import "isomorphic-fetch"
import getPort from "get-port"
import createURL from "phenomic-api-client/lib/url"

import createWatcher from "../watch"
import processFile from "../injection/processFile"
import createServer from "../api"
import writeFile from "../utils/writeFile"
import resolveURLsToPrerender from "../prerender/resolve"
import db from "../db"

const debug = require("debug")("phenomic:core:commands:build")

console.log("⚡️ Hey! Let's get on with it")
let lastStamp = Date.now()

debug("cleaning dist")
require("rimraf").sync("dist")

async function getContent(db, config) {
  debug("getting content")
  return new Promise((resolve, reject) => {
    debug("watcher created")
    const watcher = createWatcher({
      path: path.join(config.path, "content"),
      plugins: config.plugins,
    })
    watcher.onChange(async function(files) {
      debug("watcher changed")
      watcher.close()
      await db.destroy()
      try {
        await Promise.all(files.map(file => processFile(db, file, config.plugins, true)))
        resolve()
      }
      catch (error) {
        reject(error)
      }
    })
  })
}

function createFetchFunction(port) {
  debug("creating fetch function")
  return config => {
    return fetch(createURL({ ...config, root: `http://localhost:${ port }` }))
      .then(res => res.json())
  }
}

async function prerenderFileAndDependencies(config, app, fetch, url) {
  debug(`'${ url }': prepend file and deps for `)
  const files = await app.renderServer(app, fetch, url)
  debug(`'${ url }': files & deps collected`)
  return Promise.all(files.map(file => writeFile(path.join(config.outdir, file.path), file.contents)))
}

async function build(config) {
  debug("building")
  const phenomicServer = createServer(db, config.plugins)
  const port = await getPort()
  phenomicServer.listen(port)
  debug("server ready")

  // Build webpack
  const app = await config.bundler.buildForPrerendering(config)
  console.log("📦 Webpack server side done "  + (Date.now() - lastStamp) + "ms")

  lastStamp = Date.now()

  // Retreive content
  await getContent(db, config)
  console.log("📝 Got your content " + (Date.now() - lastStamp) + "ms")
  lastStamp = Date.now()
  const fetch = createFetchFunction(port)
  const urls = await resolveURLsToPrerender(config.renderer.getRoutes(app), fetch)
  debug("urls have been resolved")
  debug(urls)
  await Promise.all(urls.map(url => prerenderFileAndDependencies(config, app, fetch, url)))

  console.log("📃 Pre-rendering done " + (Date.now() - lastStamp) + "ms")
  lastStamp = Date.now()

  await config.bundler.build(config)
  console.log("📦 Webpack built " + (Date.now() - lastStamp) + "ms")
  lastStamp = Date.now()
}

export default (options) => {
  build(options)
  .then(
    () => {},
    (error) => console.error(error)
  )
}
