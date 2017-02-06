import path from "path"

// files added to report accurate coverage
import "../webpack/index.js"
import { testConfig } from "../../configurator/index.js"

// builder import ../server, so the mock won't work if defined AFTER
// import builder from "../index.js"
const serverMock = jest.fn()
jest.mock("../server.js", () => serverMock)
const builder = require("../index.js").default

const defaultCliOptions = {
  "webpackConfig": "webpack.config.js",
  "scriptBrowser": "scripts/phenomic.browser.js",
  "scriptNode": "scripts/phenomic.node.js",
}

it("should crash if config is shit", () => {
  expect(() => {
    // $FlowFixMe ignored for failure
    builder()
  })
  .toThrow()

  expect(() => {
    builder({})
  })
  .toThrow()

  expect(() => {
    builder({
      cwd: path.join(__dirname, "fixtures"),
      "webpackConfig": "wrong.webpack.config.js",
    })
  })
  .toThrow("Your webpack config must export a function")

  expect(() => {
    builder(
      {
        ...testConfig({
          cwd: path.join(__dirname, "fixtures"),
        }),
        ...defaultCliOptions,
      }
    )
  })
  .toThrow("phenomic: CLI needs --static or --server")
})

it("should be able to start a dev server", () => {
  builder(
    {
      ...testConfig({
        cwd: path.join(__dirname, "fixtures"),
        server: true,
      }),
      ...defaultCliOptions,
    }
  )
  expect(serverMock).toBeCalled()
})

it("should be able to make a static build", () => {
  // @todo
})
