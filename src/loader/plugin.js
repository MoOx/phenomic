import fs from "fs"
// import { RawSource } from "webpack-sources"

// Use the path of the plugin/loader directory to avoid conflicts on the
// loaderContext
const NS = fs.realpathSync(__dirname)

function PhenomicLoaderWebpackPlugin() {}

// Phenomic collection cache: it avoid to have to re-read content files
// between client and static build!
// We can do without this (eg: emitting a json + read the json later),
// but this will be an issue to consider for big websites.
PhenomicLoaderWebpackPlugin.collection = []

PhenomicLoaderWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin("compilation", (compilation/* , params */) => {
    compilation.plugin("normal-module-loader", (loaderContext, module) => {
      loaderContext[NS] = (loaderResult) => module.meta[NS] = loaderResult
    })

    compilation.plugin("additional-assets", (callback) => {
      const results = compilation.modules
        .map((module) => module && module.meta && module.meta[NS])
        .filter((result) => result && typeof result === "object")

      PhenomicLoaderWebpackPlugin.collection = results
      // const collection = JSON.stringify(results, null, 2)
      // compilation.assets["phenomic.collection.json"] =
      //   new RawSource(collection)

      callback()
    })
  })
}

module.exports = PhenomicLoaderWebpackPlugin
