// @flow

import { RawSource } from "webpack-sources"
import enhanceCollection from "../enhance-collection"
import feed from "./feed"
import minify from "../loader/minify.js"

import PhenomicLoaderWebpackPlugin from "../loader/plugin.js"

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
          collection: enhanceCollection(
            collection.map((item) => ({
              ...item.head,
              description: item.body,
              __url: item.__url,
            })),
            collectionOptions
          ),
        }))
      })

      callback()
    })
  })
}

module.exports = PhenomicLoaderFeedWebpackPlugin
