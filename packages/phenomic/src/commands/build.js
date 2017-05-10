import path from "path"

import "isomorphic-fetch"
import getPort from "get-port"
import createURL from "phenomic-api-client/lib/url"
import rimraf from "rimraf"

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
rimraf.sync("dist")
async function getContent(db, config: PhenomicConfig) {
  debug("getting content")
  const transformers = config.plugins.filter(
    item => typeof item.transform === "function",
  )
  if (!transformers.length) {
    throw Error("Phenomic expects at least a transform plugin")
  }
  const collectors = config.plugins.filter(
    item => typeof item.collect === "function",
  )
  if (!collectors.length) {
    throw Error("Phenomic expects at least a collector plugin")
  }
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
        await Promise.all(
          files.map(file =>
            processFile({
              config,
              db,
              file,
              transformers,
              collectors,
              isProduction: true,
            }),
          ),
        )
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
}
function createFetchFunction(port) {
  debug("creating fetch function")
  return config => {
    return fetch(
      createURL({
        ...config,
        root: `http://localhost:${port}`,
      }),
    ).then(res => res.json())
  }
}
async function prerenderFileAndDependencies(config, renderer, app, fetch, url) {
  debug(`'${url}': prepend file and deps for `)
  const files = await renderer.renderServer(app, fetch, url)
  debug(`'${url}': files & deps collected`)
  return Promise.all(
    files.map(file =>
      writeFile(path.join(config.outdir, file.path), file.contents),
    ),
  )
}
async function build(config) {
  process.env.BABEL_ENV = "production"
  debug("building")
  const phenomicServer = createServer(db, config.plugins)
  const port = await getPort()
  const runningServer = phenomicServer.listen(port)
  debug("server ready")
  try {
    const bundlers = config.plugins.filter(p => p.buildForPrerendering)
    const bundler = bundlers[0] // Build webpack
    const app = await bundler.buildForPrerendering(config)
    debug("app", app)
    console.log(
      "📦 Webpack server side done " + (Date.now() - lastStamp) + "ms",
    )
    lastStamp = Date.now() // Retreive content
    await getContent(db, config)
    console.log("📝 Got your content " + (Date.now() - lastStamp) + "ms")
    lastStamp = Date.now()
    const fetch = createFetchFunction(port)
    const renderers = config.plugins.filter(p => p.getRoutes)
    const renderer = renderers[0]
    const urls = await resolveURLsToPrerender(renderer.getRoutes(app), fetch)
    debug("urls have been resolved")
    debug(urls)
    await Promise.all(
      urls.map(url =>
        prerenderFileAndDependencies(config, renderer, app, fetch, url),
      ),
    )
    console.log("📃 Pre-rendering done " + (Date.now() - lastStamp) + "ms")
    lastStamp = Date.now()
    await bundler.build(config)
    console.log("📦 Webpack built " + (Date.now() - lastStamp) + "ms")
    lastStamp = Date.now()
    runningServer.close()
    debug("server closed")
  } catch (error) {
    runningServer.close()
    debug("server closed due to error")
    throw error
  }
}
export default (options: Object) => build(options)
