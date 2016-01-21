import test from "ava"; import "babel-core/register"

import postBuild from "../postbuild"
import { join } from "path"
import { sync as rm } from "rimraf"
import { sync as mkdir } from "mkdirp"
import { readFile } from "fs-promise"

const readOpts = { encoding: "utf8" }

const baseConfig = {
  baseUrl: { hostname: "test.host" },
  cwd: __dirname,
  destination: "_output",
}

test("post build nojekyll", async (t) => {
  const config = {
    ...baseConfig,
    destination: "_output-.nojekyll",
    nojekyll: true,
  }

  const destination = join(config.cwd, config.destination)
  rm(destination)
  mkdir(destination)

  return postBuild(config, [], () => {})
  .then(
    () => Promise.all([
      readFile(join(config.cwd, config.destination, ".nojekyll"), readOpts),
    ])
  )
  .then((files) => t.is(files[0], ""))
  .catch((err) => {
    t.fail(err)
  })
})

test("post build CNAME", async (t) => {
  const config = {
    ...baseConfig,
    destination: "_output-CNAME",
    CNAME: true,
  }

  const destination = join(config.cwd, config.destination)
  rm(destination)
  mkdir(destination)

  return postBuild(config, [], () => {})
  .then(
    () => Promise.all([
      readFile(join(config.cwd, config.destination, "CNAME"), readOpts),
    ])
  )
  .then((files) => t.is(files[0], config.baseUrl.hostname))
  .catch((err) => {
    t.fail(err)
  })
})
