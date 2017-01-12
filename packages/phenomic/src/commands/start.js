const createWatcher = require("../watch")
const path = require("path")
const processFile = require("../injection/processFile")

const db = require("../db")
const createServer = require("../api")

const express = require("express")

function createWebpackServer(config) {
  const server = express()
  server.use(config.bundler.getMiddleware(config))
  return server
}


function start (config) {
  const phenomicServer = createServer(db, config.plugins)
  const webpackServer = createWebpackServer(config)
  const io = require("socket.io")(1415)
  const watcher = createWatcher({
    path: path.join(config.path, "content"),
    plugins: config.plugins,
  })
  watcher.onChange(async function (files) {
    await db.destroy()
    await Promise.all(files.map(file => processFile(db, file, config.plugins)))
    io.emit("change")
  })
  webpackServer.use("/phenomic", phenomicServer)
  webpackServer.use("/assets", express.static(path.join(process.cwd(), "examples/content")))
  webpackServer.get("*", function (req, res) {
    res.type(".html")
    res.end(config.renderer.renderHTML())
  })
  webpackServer.listen(config.port)
  console.log(`✨ Open http://localhost:${ config.port }`)
}

module.exports = start
