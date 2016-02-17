import path from "path"

import test from "ava"; import "babel-core/register"
import webpack from "webpack"
import { sync as rimraf } from "rimraf"

test.cb("statinamic/lib/md-collection-loader", (t) => {
  const outputPath = __dirname + "/output/"
  const entry = __dirname + "/fixtures/script.js"

  rimraf(outputPath)

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

      const defaultRoute = stats.compilation.assets[
        //    fixtures/script.md
        // -> fixtures/script/index.html
        "fixtures/script/index.html.json"
      ]
      if (!defaultRoute) {
        console.log(stats.compilation.assets)
      }
      t.ok(
        defaultRoute && defaultRoute._value,
        "should create a json for an given md"
      )

      const customRoute = stats.compilation.assets[
        //    fixtures/custom-route.md
        // -> fixtures/route-custom.html
        "route-custom.html.json"
      ]
      t.ok(
        customRoute && customRoute._value,
        "should create a proper json for custom route with an extension"
      )

      const customRouteWithoutExtension = stats.compilation.assets[
        //    fixtures/custom-route-folder
        // -> fixtures/route-custom-folder/index.html
        "route-custom-folder/index.html.json"
      ]
      t.ok(
        customRouteWithoutExtension && customRouteWithoutExtension._value,
        "should create a proper json for custom route with an extension"
      )

      const customRouteWithoutSlash = stats.compilation.assets[
        //    fixtures/custom-route-folder-trailing-slash
        // -> fixtures/route-custom-folder-trailing-slash/index.html
        "route-custom-folder-trailing-slash/index.html.json"
      ]
      t.ok(
        customRouteWithoutSlash && customRouteWithoutSlash._value,
        "should create a proper json for custom route with an extension"
      )

      t.end()
    }
  )
})
