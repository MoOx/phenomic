// All these weird steps for this 'simple' test-boilerplate has been made to
// boost CI testing, tune with care if you dare to

import { denodeify as asyncify } from "promise"
import { remove as rm } from "fs-promise"
import lnfs from "lnfs"
import execCmd from "exec-cmd"
import nodeCmdShim from "cmd-shim"
const cmdShim = asyncify(nodeCmdShim)

const noop = () => {}

export function exec(cmd, opts) {
  return execCmd(cmd, { stdio: "inherit", ...opts })
}

export default async function test(
  target,
  { cleanup = noop, init = noop, lib = "lib", test = true }
) {
  try {
    const targetModules = `${ target }/node_modules`

    cleanup()

    await Promise.all([
      // node_modules link to avoid duplicate package related issues
      lnfs("node_modules/react/", `${ targetModules }/react`),
      lnfs("node_modules/react-helmet", `${ targetModules }/react-helmet`),
      lnfs("node_modules/webpack", `${ targetModules }/webpack`),

      // delete statinamic link to pruning devdeps
      rm(`${ targetModules }/statinamic`),
    ])

    await init()

    // install
    await exec("npm prune", { cwd: target })
    await exec("npm install", { cwd: target })

    // we don't use a link on statinamic directly, otherwise
    // statinamic/node_modules contains too many dependencies (dev deps) and the
    // prune that will be executed next time will remove some, which goes again
    // what we try to achieve by tuning the install to have a fast CI
    await cmdShim("lib/bin/index.js", `${ targetModules }/.bin/statinamic`)
    await lnfs("lib/bin/index.js", `${ targetModules }/.bin/statinamic`)
    await lnfs(lib, `${ targetModules }/statinamic/lib`)
    await lnfs("package.json", `${ targetModules }/statinamic/package.json`)

    // test
    if (test) {
      await exec("npm test", { cwd: target })
    }
  }
  catch (err) {
    // async workaround :)
    setTimeout(() => {
      throw err
    }, 1)
  }
}
