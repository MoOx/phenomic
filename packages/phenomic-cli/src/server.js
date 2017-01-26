import express from "express"

const debug = require("debug")("phenomic:cli:server")

const server = express()

debug("static server started")

express.use(express.static("./dist"))
server.listen(3000)
