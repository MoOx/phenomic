import test from "ava"

import postBuild from "../postbuild"
import { join } from "path"
import pify from "pify"
import mockFs from "mock-fs"
import fs from "fs"
const { readFile, access } = pify(fs)

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

// No need for assertions here
// AVA will fail if there promises rejected
test("postbuild appcache", async () => {
  const config = {
    ...baseConfig,
    baseUrl: { pathname: "" },
    offline: true,
    offlineConfig: {
      appcache: true,
      serviceWorker: false,
      pattern: [ "**" ],
    },
  }

  await postBuild(config, [], noop)
  await access("output/manifest.appcache", fs.R_OK)
})

test("postbuild service worker", async () => {
  const config = {
    ...baseConfig,
    baseUrl: { pathname: "" },
    offline: true,
    offlineConfig: {
      appcache: false,
      serviceWorker: true,
      pattern: [ "**" ],
    },
  }

  await postBuild(config, [], noop)
  await access("output/sw.js", fs.R_OK)
  await access("output/sw-register.js", fs.R_OK)
})
