import express from "express"

const server = express()

express.use(express.static("./dist"))

server.listen(3000)
