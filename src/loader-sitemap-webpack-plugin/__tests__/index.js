import webpack from "webpack"
import { sync as rimraf } from "rimraf"

import webpackVersion from "../../_utils/webpack-version"
// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderWebpackPlugin from "../../loader/plugin.js"
// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderSitemapWebpackPlugin from "../index.js"

const outputPath = __dirname + "/_output/"
rimraf(outputPath)

it("Sitemap webpack plugin", () => {
  return new Promise((resolve, reject) => webpack(
    {
      context: __dirname,
      module: {
        [webpackVersion() === 1 ? "loaders" : "rules"]: [
          {
            test: /\.(md|markdown)$/,
            loader: __dirname + "/../../loader/index.js",
            exclude: /node_modules/,
          },
        ],
      },
      entry: __dirname + "/fixtures/script.js",
      ...(
        webpackVersion() === 1
        ? { resolve: { extensions: [ "" ] } }
        : {}
      ),
      output: {
        path: outputPath + "/routes",
        filename: "routes.js",
      },
      plugins: [
        new PhenomicLoaderWebpackPlugin(),
        new PhenomicLoaderSitemapWebpackPlugin({
          site_url: "https://phenomic.io/",
        }),
      ],
    },
    function(err, stats) {
      if (err) {
        reject(err)
      }
      resolve(stats)
    })
  )
  .then(
    (stats) => {
      // doesn't give any error
      expect(
        stats.hasErrors()
      )
      .toBeFalsy()
      if (stats.hasErrors()) {
        console.error(stats.compilation.errors)
      }

      // doesn't give any warning
      expect(
        stats.hasWarnings()
      )
      .toBeFalsy()
      if (stats.hasWarnings()) {
        console.log(stats.compilation.warnings)
      }

      const sitemap = stats.compilation.assets["sitemap.xml"]
      if (!sitemap) {
        console.log(stats.compilation.assets)
      }

      // should create a xml for the sitemap
      expect(
        sitemap && sitemap._value,
      )
      .toBeTruthy()

      // should contain a filtred entry (urlset)
      expect(
        sitemap._value.includes("<urlset xmlns=\"http://www.sitemaps.org"),
      )
      .toBeTruthy()

      // should contain a filtred entry (loc)
      expect(
        sitemap._value.includes("<loc>https://phenomic.io/one"),
      )
      .toBeTruthy()
    }
  )
})
