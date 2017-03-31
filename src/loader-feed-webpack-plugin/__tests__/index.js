import webpack from "webpack"
import { sync as rimraf } from "rimraf"

// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderWebpackPlugin from "../../loader/plugin.js"
// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderFeedWebpackPlugin from "../index.js"

const outputPath = __dirname + "/_output/"
rimraf(outputPath)

it("Feed webpack plugin", () => {
  return new Promise((resolve, reject) => webpack(
    {
      context: __dirname,
      module: {
        "rules": [
          {
            test: /\.(md|markdown)$/,
            loader: __dirname + "/../../loader/index.js",
            exclude: /node_modules/,
          },
        ],
      },
      entry: __dirname + "/fixtures/script.js",
      output: {
        path: outputPath + "/routes",
        filename: "routes.js",
      },
      plugins: [
        new PhenomicLoaderWebpackPlugin(),
        new PhenomicLoaderFeedWebpackPlugin({
          feedsOptions: {
            title: "title",
            site_url: "site_url",
          },
          feeds: {
            "feed.xml": {
              collectionOptions: {
                filter: { layout: "Post" },
              },
            },
          },
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

      const feed = stats.compilation.assets["feed.xml"]
      if (!feed) {
        console.log(stats.compilation.assets)
      }

      // should create a xml for the feed
      expect(
        feed && feed._value,
      )
      .toBeTruthy()

      // should contain a filtred entry (link)
      expect(
        feed._value.includes("<link>/fixtures/two"),
      )
      .toBeTruthy()

      // should contain a filtred entry (title)
      expect(
        feed._value.includes("<title><![CDATA[Two"),
      )
      .toBeTruthy()

      // should contain a filtred entry (body)
      expect(
        feed._value.includes("<description><![CDATA[<p>2 3 4"),
      )
      .toBeTruthy()

      // should not contain an excluded entry
      expect(
        feed._value.includes("<link>/fixtures/one"),
      )
      .toBeFalsy()
    }
  )
})
