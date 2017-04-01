import webpack from "webpack"
import { sync as rimraf } from "rimraf"

// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderWebpackPlugin from "../plugin.js"

const outputPath = __dirname + "/_output/"
rimraf(outputPath)

it("should compile markdown files", () => {
  return new Promise((resolve, reject) => webpack(
    {
      module: {
        "rules": [
          {
            test: /\.(md|markdown)$/,
            loader: __dirname + "/../index.js",
            exclude: /node_modules/,
          },
        ],
      },
      plugins: [
        new PhenomicLoaderWebpackPlugin(),
      ],
      context: __dirname,
      entry: __dirname + "/fixtures/script.js",
      output: {
        path: outputPath + "/routes",
        filename: "routes.js",
      },
    },
    function(err, stats) {
      if (err) {
        reject(err)
      }
      resolve(stats)
    }
  ))
  .then(
    (stats) => {
      expect(stats.hasErrors()).toBeFalsy()
      if (stats.hasErrors()) {
        console.error(stats.compilation.errors)
      }
      expect(stats.hasWarnings()).toBeFalsy()
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
      expect(defaultRoute && defaultRoute._value).toBeTruthy()

      const customRoute = stats.compilation.assets[
        //    fixtures/custom-route.md
        // -> fixtures/route-custom.html
        "route-custom.html"+
        ".46aa87f4e34aa065935bd6ddd87b9f3c.json"
      ]
      // should create a proper json for custom route with an extension
      expect(customRoute && customRoute._value).toBeTruthy()

      const customRouteWithoutExtension = stats.compilation.assets[
        //    fixtures/custom-route-folder
        // -> fixtures/route-custom-folder/index.html
        "route-custom-folder/index.html" +
        ".90c288b307f5401be686452389c9c8e6.json"
      ]
      // should create a proper json for custom route with an extension
      expect(
        customRouteWithoutExtension && customRouteWithoutExtension._value
      ).toBeTruthy()

      const customRouteWithoutSlash = stats.compilation.assets[
        //    fixtures/custom-route-folder-trailing-slash
        // -> fixtures/route-custom-folder-trailing-slash/index.html
        "route-custom-folder-trailing-slash/index.html" +
        ".855f0b74436493523652693003d3f9d1.json"
      ]

      "should create a proper json for custom route with an extension"
      expect(
        customRouteWithoutSlash && customRouteWithoutSlash._value
      ).toBeTruthy()

      const customRouteRootIndex = stats.compilation.assets[
        //    fixtures/custom-route-root-index.md
        // -> fixtures/index.html
        "index.html" +
        ".8817d2a1fab9dfb9b4b52cd6ee7529ab.json"
      ]
      // should create a proper json for custom route with an extension
      expect(customRouteRootIndex && customRouteRootIndex._value).toBeTruthy()
    },
    (err) => expect(err).toBe(undefined)
  )
})

it("can be used with plugins", () => {
  return new Promise((resolve, reject) => webpack(
    {
      module: {
        "rules": [
          {
            test: /\.(md|markdown)$/,
            loader: __dirname + "/../index.js",
            exclude: /node_modules/,
            query: {
              plugins: [
                () => {
                  return { test: "dumb" }
                },
              ],
            },
          },
        ],
      },
      plugins: [
        new PhenomicLoaderWebpackPlugin(),
      ],
      entry: __dirname + "/fixtures/script.js",
      output: {
        path: outputPath + "/plugins",
        filename: "plugins.js",
      },
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
      expect(stats.hasErrors()).toBeFalsy()
      if (stats.hasErrors()) {
        console.error(stats.compilation.errors)
      }

      // doesn't give any warning
      expect(stats.hasWarnings()).toBeFalsy()
      if (stats.hasWarnings()) {
        console.log(stats.compilation.warnings)
      }

      let expectations = 0
      Object.keys(stats.compilation.assets)
      .filter((key) => key.endsWith(".json"))
      .forEach((key) => {
        const result = JSON.parse(stats.compilation.assets[key]._value)
        if (result.test) {
          expect(result.test).toBe("dumb")
          expectations++
        }
      })
      // check we got all the expectation we wanted
      expect(expectations).toBe(5)
    },
    (err) => expect(err).toBe(undefined)
  )
})
