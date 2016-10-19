import test from "ava"
import webpack from "webpack"
import { sync as rimraf } from "rimraf"

import webpackVersion from "../../_utils/webpack-version"
// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderWebpackPlugin from "../../loader/plugin.js"
// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderFeedWebpackPlugin from "../index.js"

const outputPath = __dirname + "/_output/"
rimraf(outputPath)

test.cb("loader feed webpack plugin", (t) => {
  webpack(
    {
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
        throw err
      }

      t.falsy(stats.hasErrors(), "doesn't give any error")
      if (stats.hasErrors()) {
        console.error(stats.compilation.errors)
      }

      t.falsy(stats.hasWarnings(), "doesn't give any warning")
      if (stats.hasWarnings()) {
        console.log(stats.compilation.warnings)
      }

      const feed = stats.compilation.assets["feed.xml"]
      if (!feed) {
        console.log(stats.compilation.assets)
      }
      t.truthy(
        feed && feed._value,
        "should create a xml for the feed"
      )

      t.truthy(
        feed._value.includes("<link>/fixtures/two"),
        "should contain a filtred entry (link)"
      )
      t.truthy(
        feed._value.includes("<title><![CDATA[Two"),
        "should contain a filtred entry (title)"
      )
      t.truthy(
        feed._value.includes("<description><![CDATA[<p>2 3 4"),
        "should contain a filtred entry (body)"
      )

      t.falsy(
        feed._value.includes("<link>/fixtures/one"),
        "should not contain an excluded entry"
      )

      t.end()
    }
  )
})
