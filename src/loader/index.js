// @flow

import fs from "fs"
import path from "path"

import loaderUtils from "loader-utils"
import frontMatterParser from "gray-matter"

import pathToUri from "../_utils/path-to-uri"
import urlify from "../_utils/urlify"

// Use the path of the loader directory to avoid conflicts on the loaderContext
const NS = fs.realpathSync(__dirname)

const loader = function(input: string) {
  const webpackInstance: WebpackInstance = this

  loader.getCollection = () => this[NS]

  const options = {
    ...webpackInstance.options.phenomic,
    ...loaderUtils.parseQuery(webpackInstance.query),
  }

  // removed
  if (options.feeds) {
    throw new Error(
      "Phenomic loader `feed` option has been changed since 0.17.0. " +
      "The changelog was not mentionning this breaking change. " +
      "Sorry about that. " +
      "Please visit https://phenomic.io/docs/usage/feeds/ to know how to " +
      "migrate (spoiler: it's easy). "
    )
  }

  const context = options.context || webpackInstance.options.context
  const plugins = (
    options.plugins ||
    require("../loader-preset-markdown").default
  )

  const relativePath = path.relative(context, webpackInstance.resourcePath)

  const frontMatter = frontMatterParser(input)
  const pluginsResult = plugins.reduce((result, plugin) => {
    return plugin({
      frontMatter,
      result,
      options,
    })
  }, {})

  let tmpUrl = urlify(
    pluginsResult.head && pluginsResult.head.route
      // custom route
      ? pluginsResult.head.route
      // default route
      : relativePath
  )
  tmpUrl = (tmpUrl.substring(0, 1) === "/") ? tmpUrl.slice(1) : tmpUrl

  const url = urlify(tmpUrl)
  const resourceUrl = urlify(tmpUrl, true)
  const contentHash = loaderUtils.getHashDigest(input)
  const dataUrl = resourceUrl + "." + contentHash + ".json"

  const metadata = {
    __filename: relativePath,
    __url: pathToUri("/", url),
    __resourceUrl: pathToUri("/", resourceUrl),
    __dataUrl: pathToUri("/", dataUrl),
  }

  const result = {
    ...pluginsResult,
    ...metadata,
  }

  webpackInstance.emitFile(dataUrl, JSON.stringify(result))

  if (typeof webpackInstance[NS] !== "function") {
    throw new Error(
      "You are using phenomic loader without the corresponding plugin. " +
      "This plugin should be added automatically by Phenomic, so if you are " +
      "facing this issue, you are probably playing with the fire. " +
      "To get more information, you can reach us on our community chat. " +
      "https://phenomic.io/"
    )
  }
  webpackInstance[NS](result)

  return "module.exports = " + JSON.stringify(pathToUri("/", dataUrl))
}

module.exports = loader
