import path from "path"

import test from "ava"; import "babel-core/register"
import webpack from "webpack"

test.cb("statinamic/lib/md-collection-loader", (t) => {
  t.plan(3)

  const outputPath = __dirname + "/output/"
  const entry = __dirname + "/fixtures/script.js"
  const fixtureResult = path.join("fixtures", "script", "index.json")

  webpack(
    {
      output: {
        path: outputPath,
        filename: "bundle.js",
      },
      resolve: { extensions: [ "" ] },
      module: {
        loaders: [
          {
            test: /\.md$/,
            loader: __dirname + "/../index.js",
            exclude: /node_modules/,
          },
        ],
      },
      entry,
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
        stats.compilation.assets[fixtureResult]._value,
        "should create a json for an given md"
      )

      t.end()
    }
  )
})
