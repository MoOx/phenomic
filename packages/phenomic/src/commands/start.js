import path from "path"

import express from "express"
import socketIO from "socket.io"

import createWatcher from "../watch"
import processFile from "../injection/processFile"
import db from "../db"
import createServer from "../api"

const debug = require("debug")("phenomic:core:commands:start")

function createBundlerServer(config) {
  debug("creating webpack server")
  const server = express()
  const bundlers = config.plugins.filter((p) => p.buildForPrerendering)
  const bundler = bundlers[0]
  bundler.getMiddleware && server.use(bundler.getMiddleware(config))
  return server
}

function start(config) {
  debug("starting phenomic server")
  const phenomicServer = createServer(db, config.plugins)
  const bundlerServer = createBundlerServer(config)
  const renderers = config.plugins.filter((p) => p.getRoutes)
  const renderer = renderers[0]
  const io = socketIO(1415)
  const watcher = createWatcher({
    path: path.join(config.path, "content"),
    plugins: config.plugins,
  })
  watcher.onChange(async function(files) {
    debug("watcher changed")
    await db.destroy()
    await Promise.all(files.map(file => processFile(db, file, config.plugins)))
    io.emit("change")
  })
  bundlerServer.use("/phenomic", phenomicServer)
  bundlerServer.use("/assets", express.static(path.join(process.cwd(), "examples/content")))
  bundlerServer.get("*", function(req, res) {
    res.type(".html")
    res.end(renderer.renderHTML())
  })
  bundlerServer.listen(config.port)
  console.log(`✨ Open http://localhost:${ config.port }`)
}

export default start
