import fs from "fs"
import { join } from "path"

import test from "ava"
import pify from "pify"
import mockFs from "mock-fs"

import postBuild from "../post-build.js"

const { readFile } = pify(fs)

const readOpts = { encoding: "utf8" }

const baseConfig = {
  baseUrl: { hostname: "test.host" },
  cwd: __dirname,
  destination: "output",
}

const noop = () => {}

test.before(() => {
  mockFs({
    [process.cwd() + "/output"]: {},
  })
})

test.after(() => {
  mockFs.restore()
})

test("post build nojekyll", async (t) => {
  const config = {
    ...baseConfig,
    nojekyll: true,
  }

  await postBuild(config, [], noop)
  const file = await readFile(join(config.destination, ".nojekyll"), readOpts)

  t.is(file, "")
})

test("post build CNAME", async (t) => {
  const config = {
    ...baseConfig,
    CNAME: true,
  }

  await postBuild(config, [], noop)
  const file = await readFile(join(config.destination, "CNAME"), readOpts)
  t.is(file, config.baseUrl.hostname)
})
