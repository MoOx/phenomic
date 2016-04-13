import builder from "phenomic/lib/builder"

import config from "./config.js"

const exports = {
  metadata: require.resolve("../web_modules/app/metadata"),
  routes: require.resolve("../web_modules/app/routes"),
}
import store from "../web_modules/app/store"

builder({
  config,
  exports,
  store,
})
