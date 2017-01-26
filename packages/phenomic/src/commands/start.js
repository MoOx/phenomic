import path from "path"

import express from "express"
import socketIO from "socket.io"

import createWatcher from "../watch"
import processFile from "../injection/processFile"
import db from "../db"
import createServer from "../api"

const debug = require("debug")("phenomic:core:commands:start")

function createWebpackServer(config) {
  debug("creating webpack server")
  const server = express()
  server.use(config.bundler.getMiddleware(config))
  return server
}

function start(config) {
  debug("starting phenomic server")
  const phenomicServer = createServer(db, config.plugins)
  const webpackServer = createWebpackServer(config)
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
  webpackServer.use("/phenomic", phenomicServer)
  webpackServer.use("/assets", express.static(path.join(process.cwd(), "examples/content")))
  webpackServer.get("*", function(req, res) {
    res.type(".html")
    res.end(config.renderer.renderHTML())
  })
  webpackServer.listen(config.port)
  console.log(`✨ Open http://localhost:${ config.port }`)
}

export default start
