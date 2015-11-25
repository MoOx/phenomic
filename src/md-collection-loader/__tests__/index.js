import path from "path"

import test from "tape"
import webpack from "webpack"

test("statinamic/lib/md-collection-loader", (t) => {
  webpack(
    {
      output: {
        path: "./src/md-collection-loader/__tests__/output/",
        filename: "bundle.js",
      },
      resolve: { extensions: [ "" ] },
      module: {
        loaders: [
          {
            test: /\.md$/,
            loader: "../../index.js",
            exclude: /node_modules/,
          },
        ],
      },
      entry: "./src/md-collection-loader/__tests__/fixtures/script.js",
    },
    function(err, stats) {
      if (err) {
        throw err
      }

      t.notOk(stats.hasErrors(), "doesn't give any error")
      if (stats.hasErrors()) {
        console.error(stats.compilation.errors)
      }

      t.notOk(stats.hasWarnings(), "doesn't give any warning")
      if (stats.hasWarnings()) {
        console.log(stats.compilation.warnings)
      }

      t.ok(
        stats.compilation.assets[
          path.join(
            "src", "md-collection-loader", "__tests__", "fixtures", "script",
            "index.json"
          )
        ]
        ._value,
        "should create a json for an given md"
      )

      t.end()
    }
  )
})
