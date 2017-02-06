import { RawSource } from "webpack-sources"
import sm from "sitemap"

import enhanceCollection from "../enhance-collection"
import minify from "../loader/minify.js"
// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderWebpackPlugin from "../loader/plugin.js"

function PhenomicLoaderSitemapWebpackPlugin(options: Object) {
  this.options = options
}

PhenomicLoaderSitemapWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compilation", (compilation/* , params */) => {
    compilation.plugin("additional-assets", (callback) => {
      if (!PhenomicLoaderWebpackPlugin.collection) {
        throw new Error(
          "Missing Phenomic collection in webpack compilation object. " +
          "This probably means you are playing with fire."
        )
      }

      const collection = minify(PhenomicLoaderWebpackPlugin.collection)
      const { site_url, collectionOptions } = this.options || {}

      if (!site_url) {
        throw new Error(
          "Missing `site_url` option in sitemap configuration. "
        )
      }

      const sitemap = sm.createSitemap ({
        hostname: site_url,
        urls: enhanceCollection(collection, collectionOptions)
          .map(item => ({ url: item.__url })),
      })

      compilation.assets["sitemap.xml"] = new RawSource(sitemap.toString())

      callback()
    })
  })
}

module.exports = PhenomicLoaderSitemapWebpackPlugin
