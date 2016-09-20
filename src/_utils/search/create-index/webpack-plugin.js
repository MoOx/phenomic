// @flow
import { RawSource } from "webpack-sources"
import PhenomicLoaderWebpackPlugin from "../../../loader/plugin.js"
import createIndex from "./index"

function CreateSearchIndexWebpackPlugin(options: Object) {
  this.options = options
}

CreateSearchIndexWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compilation", (compilation/* , params */) => {
    compilation.plugin("additional-assets", (callback) => {
      if (!PhenomicLoaderWebpackPlugin.collection) {
        throw new Error(
          "Missing Phenomic collection in webpack compilation object. " +
          "This probably means you are playing with fire."
        )
      }
      const collection = PhenomicLoaderWebpackPlugin.collection
      const searchIndex = []

      collection.forEach((item: PhenomicCollectionItem) => {
        const hierarchy = createIndex(item.body)
        hierarchy.forEach((p, index) => {
          searchIndex.push({
            objectId: item.__url + "#" + index,
            title: item.head.title || item.head.metaTitle,
            __url: item.__url,
            __dataUrl: item.__dataUrl,
            ...p,
          })
        })
      })
      compilation.assets["search-index.json"] = new RawSource(
        JSON.stringify(searchIndex, null, 2)
      )
      callback()
    })
  })
}

module.exports = CreateSearchIndexWebpackPlugin
