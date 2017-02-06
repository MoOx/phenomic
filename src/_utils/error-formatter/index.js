import os from "os"
import path from "path"

import colors from "chalk"
import multili from "multili"

import { cacheDir } from "../../builder/webpack/config.node.js"

const normalizeWinPath = (path) => path.replace(/\\/g, "\\\\")

export const cwd = normalizeWinPath(process.cwd())
const cache = normalizeWinPath(cacheDir)

const reSep = normalizeWinPath(path.sep)
const webpackNodeModulesRE = new RegExp("webpack:" + reSep + reSep + "?~", "gm")
const cleanStaticBuildPathRE = new RegExp(cache + reSep, "gm")
const cwdRE = new RegExp(cwd + reSep, "g")
const homeRE = new RegExp(os.homedir(), "g")

const cleanPaths = (string) => string
  // normalize windows path
  .replace(/\\+g/, "/")
  // cleanup
  .replace(cleanStaticBuildPathRE, "")
  .replace(webpackNodeModulesRE, "node_modules")
  .replace(cwdRE, "")
  .replace(homeRE, "~")

const notDefinedRE = /\s+(.*)( is not defined.*)/gm
export const help = colors.yellow(
  "\n\n" +
  "If you are seeing this message during the static build, that means you are" +
  "probably using an API only available in the browser (such as 'window', " +
  "'document', 'Element'...). Note that a module can be responsible for this." +
  "\n" +
  "In order to prevent this error, you can simply avoid calling the code " +
  "responsible when the dependency is not available. " +
  "\n\n" +
  "Examples:\n" +
  /* eslint-disable max-len */
  multili(`
For a single API:

  const element = (typeof document !== "undefined") ? document.querySelector(".something") : null

  if (element) {
    // do your thing with your element
  }

For a module:

  const clipboard = (typeof window !== "undefined") ? require("clipboard") : null

  // then later

  if (clipboard) {
    // do your thing using the module
  }
  `)
  /* eslint-enable max-len */
)
const enhanceError = (error) => {
  if (error.message.match(notDefinedRE) || error.stack.match(notDefinedRE)) {
    error.stack += help
  }
}

export default (error: Error) => {
  error.message = "\n\n" + colors.red(error.message) + "\n"

  // sometimes paths are in message
  // eg: errors thrown by webpack loaders/plugin
  error.message = cleanPaths(error.message)
  error.stack = cleanPaths(error.stack)
  enhanceError(error)

  return error
}
