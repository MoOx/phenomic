// All these weird steps for this 'simple' test-setup has been
// made to boost CI testing, tune with care if you dare to

import pify from "pify"
import { remove as rm } from "fs-promise"
import lnfs from "lnfs"
import execCmd from "exec-cmd"
import nodeCmdShim from "cmd-shim"

import { plainLog as log } from "../../src/_utils/log"

const cmdShim = pify(nodeCmdShim)

const noop = () => {}

export function exec(cmd, opts) {
  return execCmd(cmd, { stdio: "inherit", ...opts })
}

export default async function test(
  target,
  {
    cleanup = noop,
    init = noop,
  } = {}
) {
  try {
    const targetModules = `${ target }/node_modules`

    await cleanup()

    await Promise.all([
      // node_modules link to avoid duplicate package related issues
      lnfs("node_modules/react/", `${ targetModules }/react`),
      lnfs("node_modules/react-helmet", `${ targetModules }/react-helmet`),
      lnfs("node_modules/webpack", `${ targetModules }/webpack`),

      // delete phenomic link to pruning devdeps
      rm(`${ targetModules }/phenomic`),
    ])

    await init()


    try {
      log("yarn installing...")
      await exec("yarn install", { cwd: target })
    } catch (err) {
      log("npm installing...")
      await exec("npm prune", { cwd: target })
      await exec("npm install", { cwd: target })
    }

    // we don't use a link on phenomic directly, otherwise
    // phenomic/node_modules contains too many dependencies (dev deps) and the
    // prune that will be executed next time will remove some, which goes again
    // what we try to achieve by tuning the install to have a fast CI
    await cmdShim("lib/bin/index.js", `${ targetModules }/.bin/phenomic`)
    await lnfs("lib/bin/index.js", `${ targetModules }/.bin/phenomic`)
    await lnfs("lib", `${ targetModules }/phenomic/lib`)
    await lnfs("package.json", `${ targetModules }/phenomic/package.json`)
  }
  catch (err) {
    // async workaround :)
    setTimeout(() => {
      throw err
    }, 1)
  }
}
