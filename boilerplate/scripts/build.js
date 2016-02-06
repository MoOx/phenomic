import builder from "statinamic/lib/builder"

import * as layouts from "../web_modules/layouts"
import metadata from "../web_modules/app/metadata"
import routes from "../web_modules/app/routes"
import store from "../web_modules/app/store"

import config from "./config.js"
import webpackConfig from "./webpack.config.babel.js"
import clientWebpackConfig from "./webpack.config.client.js"

builder({
  config,
  webpackConfig,
  clientWebpackConfig,

  layouts,
  metadata,
  routes,
  store,
})
