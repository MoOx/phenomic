// @flow

import os from "os"
import path from "path"

import colors from "chalk"

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

export default (error: Error) => {
  error.message = "\n\n" + colors.red(error.message) + "\n"

  // sometimes paths are in message
  // eg: errors thrown by webpack loaders/plugin
  error.message = cleanPaths(error.message)
  error.stack = cleanPaths(error.stack)

  return error
}
