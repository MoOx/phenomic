import { RawSource } from "webpack-sources"

import enhanceCollection from "../enhance-collection"
import minify from "../loader/minify.js"
// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderWebpackPlugin from "../loader/plugin.js"

import feed from "./feed"

function PhenomicLoaderFeedWebpackPlugin(options: Object) {
  this.options = options
}

PhenomicLoaderFeedWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compilation", (compilation/* , params */) => {
    compilation.plugin("additional-assets", (callback) => {
      if (!PhenomicLoaderWebpackPlugin.collection) {
        throw new Error(
          "Missing Phenomic collection in webpack compilation object. " +
          "This probably means you are playing with fire."
        )
      }
      const collection = minify(PhenomicLoaderWebpackPlugin.collection)

      const feeds = this.options.feeds || []
      const feedsOptions = this.options.feedsOptions || {}
      Object.keys(feeds).forEach((name) => {
        const { feedOptions, collectionOptions } = feeds[name]
        compilation.assets[name] = new RawSource(feed({
          feedOptions: { ...feedsOptions, ...feedOptions },
          destination: name,
          collection: (
            enhanceCollection(collection, collectionOptions)
            .map((item) => {
              const fullItem = PhenomicLoaderWebpackPlugin.collection.find(
                (fullItem) => item.__url === fullItem.__url
              )
              return {
                ...item,
                // null should not happen, but flow ask for secure code :)
                description: fullItem ? fullItem.body : null,
              }
            })
          ),
        }))
      })

      callback()
    })
  })
}

module.exports = PhenomicLoaderFeedWebpackPlugin
