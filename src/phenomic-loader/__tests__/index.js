import test from "ava"
import webpack from "webpack"
import { sync as rimraf } from "rimraf"

const outputPath = __dirname + "/output/"
rimraf(outputPath)

test.cb("phenomic loader", (t) => {
  webpack(
    {
      module: {
        loaders: [
          {
            test: /\.md$/,
            loader: __dirname + "/../index.js",
            exclude: /node_modules/,
          },
        ],
      },
      entry: __dirname + "/fixtures/script.js",
      resolve: { extensions: [ "" ] },
      output: {
        path: outputPath + "/routes",
        filename: "routes.js",
      },
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

      const defaultRoute = stats.compilation.assets[
        //    fixtures/script.md
        // -> fixtures/script/index.html
        "fixtures/script/index.html" +
        ".6a655e2e0dc8362c2dec75a73780abf4.json"
      ]
      if (!defaultRoute) {
        console.log(stats.compilation.assets)
      }
      t.truthy(
        defaultRoute && defaultRoute._value,
        "should create a json for an given md"
      )

      const customRoute = stats.compilation.assets[
        //    fixtures/custom-route.md
        // -> fixtures/route-custom.html
        "route-custom.html"+
        ".46aa87f4e34aa065935bd6ddd87b9f3c.json"
      ]
      t.truthy(
        customRoute && customRoute._value,
        "should create a proper json for custom route with an extension"
      )

      const customRouteWithoutExtension = stats.compilation.assets[
        //    fixtures/custom-route-folder
        // -> fixtures/route-custom-folder/index.html
        "route-custom-folder/index.html" +
        ".90c288b307f5401be686452389c9c8e6.json"
      ]
      t.truthy(
        customRouteWithoutExtension && customRouteWithoutExtension._value,
        "should create a proper json for custom route with an extension"
      )

      const customRouteWithoutSlash = stats.compilation.assets[
        //    fixtures/custom-route-folder-trailing-slash
        // -> fixtures/route-custom-folder-trailing-slash/index.html
        "route-custom-folder-trailing-slash/index.html" +
        ".855f0b74436493523652693003d3f9d1.json"
      ]
      t.truthy(
        customRouteWithoutSlash && customRouteWithoutSlash._value,
        "should create a proper json for custom route with an extension"
      )

      t.end()
    }
  )
})

test.cb("phenomic loader can be used with plugins", (t) => {
  webpack(
    {
      module: {
        loaders: [
          {
            test: /\.md$/,
            loader: __dirname + "/../index.js",
            exclude: /node_modules/,
          },
        ],
      },
      phenomic: {
        plugins: [
          () => {
            return { test: "dumb" }
          },
        ],
      },
      resolve: { extensions: [ "" ] },
      entry: __dirname + "/fixtures/script.js",
      output: {
        path: outputPath + "/plugins",
        filename: "plugins.js",
      },
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

      Object.keys(stats.compilation.assets)
      .filter((key) => key.endsWith(".json"))
      .forEach((key) => {
        t.is(
          JSON.parse(stats.compilation.assets[key]._value).test,
          "dumb"
        )
      })
      t.plan(2+4) // 2, err, warn, 4 => array
      t.end()
    }
  )
})
