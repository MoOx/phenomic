// @flow

import path from "path"
import loaderUtils from "loader-utils"
import frontMatterParser from "gray-matter"
import colors from "chalk"

import pathToUri from "../_utils/path-to-uri"
import urlify from "../_utils/urlify"
import enhanceCollection from "../enhance-collection"
import feed from "./feed"
import cache from "./cache"

let timeout

module.exports = function(input: string) {
  const webpackInstance: WebpackInstance = this

  // deprecated
  if (
    webpackInstance.options.phenomic &&
    (
      webpackInstance.options.phenomic.loader ||
      webpackInstance.options.phenomic.contentLoader
    )
  ) {
    console.log("⚠️ " + colors.red(
      "Phenomic loader should now be defined directly under `phenomic` key, " +
      "not `phenomic.loader` or `phenomic.contentLoader` in your webpack " +
      "configuration."
    ))
  }

  const options = {
    ...webpackInstance.options.phenomic,
    ...loaderUtils.parseQuery(webpackInstance.query),
  }
  const context = options.context || webpackInstance.options.context
  const plugins = (
    options.plugins ||
    require("../phenomic-loader-preset-markdown").default
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

  const tmpUrl = urlify(
    pluginsResult.head && pluginsResult.head.route
      // custom route
      ? pluginsResult.head.route
      // default route
      : relativePath
  )
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

  // update collection
  // replace or add depending on the cache state
  let previousIndex
  cache.forEach((md, index) => {
    if (md.__filename === relativePath) {
      previousIndex = index
    }
  })
  if (previousIndex) {
    cache[previousIndex] = result
  }
  else {
    cache.push(result)
  }

  if (timeout) {
    clearTimeout(timeout)
  }
  else {
    setTimeout(() => {
      // emit updated feeds
      const feeds = options.feeds || []
      const feedsOptions = options.feedsOptions || {}
      Object.keys(feeds).forEach((name) => {
        const { feedOptions, collectionOptions } = feeds[name]
        webpackInstance.emitFile(name, feed({
          feedOptions: {
            ...feedsOptions,
            ...feedOptions,
          },
          destination: name,
          collection: enhanceCollection(
            cache.map((item) => ({
              ...item.head,
              description: item.body,
              __url: item.__url,
            })),
            collectionOptions
          ),
        }))
      })
    }, 100)
  }

  return "module.exports = " + JSON.stringify(pathToUri("/", dataUrl))
}
