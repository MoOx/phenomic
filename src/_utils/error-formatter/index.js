// @flow

import os from "os"

import colors from "chalk"

import { cacheDir } from "../../builder/webpack/config.node.js"

const cleanStaticBuildPathRE = new RegExp(cacheDir + "\/(webpack:\/)?", "g")
const cwdRE = new RegExp(process.cwd(), "g")
const homeRE = new RegExp(os.homedir(), "g")
const truncatedStack = "[ truncated stack ]"

export default (error: Error) => {
  error.message = "\n\n" + colors.red(error.message) + "\n"

  error.stack = error.stack
    .replace(cleanStaticBuildPathRE, "")
    .replace(cwdRE, ".")
    .replace(homeRE, "~")
    .replace(/^(\s*)at\s.*\([a-z].*/gm, "$1" + truncatedStack)

    // keep only one "truncatedStack" line
    .split(truncatedStack)[0] + truncatedStack + "\n"

  return error
}
