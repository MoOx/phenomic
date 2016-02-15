import builder from "statinamic/lib/builder"

import * as exports from "../web_modules/app/exports"
import store from "../web_modules/app/store"

import config from "./config.js"
import webpackConfig from "./webpack.config.babel.js"
import clientWebpackConfig from "./webpack.config.client.js"

builder({
  config,
  webpackConfig,
  clientWebpackConfig,

  exports,
  store,
})
