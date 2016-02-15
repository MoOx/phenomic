import builder from "statinamic/lib/builder"

const layouts = require.resolve("../web_modules/layouts")
const metadata = require.resolve("../web_modules/app/metadata")
const routes = require.resolve("../web_modules/app/routes")
import store from "../web_modules/app/store"

import config from "./config.js"
import webpackConfig from "./webpack.config.babel.js"
import clientWebpackConfig from "./webpack.config.client.js"

builder({
  config,
  webpackConfig,
  clientWebpackConfig,

  store,
  data: {
    layouts,
    metadata,
    routes,
  },
})
