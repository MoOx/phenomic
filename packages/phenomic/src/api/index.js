import express from "express"

import pkg from "../../package.json"

const debug = require("debug")("phenomic:core:api")

const encode = text => new Buffer(text).toString("base64")
const decode = text => new Buffer(text, "base64").toString()

const connect = (list, limit) => {
  const hasNextPage = limit === undefined ? false : list.length >= limit
  return {
    hasNextPage,
    next: hasNextPage ? encode(list[list.length - 2].key) : null,
    list: list.slice(0, limit),
  }
}

function createServer(db: PhenomicDB, plugins: PhenomicPlugins) {
  debug("creating server")
  const server = express()

  server.get(
    "/",
    async function(req: express$Request, res: express$Response) {
      debug("get api version")
      res.json({
        engine: "phenomic",
        version: pkg.version,
      })
    })

  server.get(
    "/:collection/by-:filter/:value/:sort.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params))
      try {
        const reverse = req.params.sort === "desc"
        const list = await db.getList(req.params.collection, { reverse }, req.params.filter, req.params.value)
        res.json(connect(list))
      }
      catch (error) {
        console.error(error)
        res.status(404).end()
      }
    })

  server.get(
    "/:collection/by-:filter/:value/:sort/limit-:limit.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params))
      try {
        const limit = parseInt(req.params.limit)
        const reverse = req.params.sort === "desc"
        const list = await db.getList(
          req.params.collection,
          {
            limit: limit + 1,
            reverse,
          },
          req.params.filter, req.params.value
        )
        res.json(connect(list, limit))
      }
      catch (error) {
        console.error(error)
        res.status(404).end()
      }
    })

  server.get(
    "/:collection/by-:filter/:value/:sort/limit-:limit/after-:after.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params))
      try {
        const limit = parseInt(req.params.limit)
        const lt = decode(req.params.after)
        const reverse = req.params.sort === "desc"
        const list = await db.getList(
          req.params.collection,
          {
            limit: limit + 1,
            lt,
            reverse,
          },
          req.params.filter,
          req.params.value
        )
        res.json(connect(list, limit))
      }
      catch (error) {
        console.error(error)
        res.status(404).end()
      }
    })

  server.get(
    "/:collection/item/*.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params))
      try {
        const resource = await db.get(req.params.collection, req.params["0"])
        res.json(resource.value)
      }
      catch (error) {
        console.error(error)
        res.status(404).end()
      }
    })

  // Install the plugins
  plugins.forEach(plugin => {
    if (plugin.type === "api") {
      debug(`installing plugin '${ plugin.name }'`)
      plugin.define(server, db)
    }
    else {
      debug(`plugin '${ plugin.name }' have no API definition`)
    }
  })

  return server
}

export default createServer
