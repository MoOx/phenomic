// @flow
import { yellow } from "chalk"
const log: Function = require("debug")("phenomic:configurator:offline")

import { parse } from "url"

const defaultPattern: Array<string> = [ "**", "!**/*.html", "index.html" ]
const defaultOfflineConfig = {
  appcache: true,
  serviceWorker: true,
  pattern: defaultPattern,
}

export default (
  { pkg, config, errors }:
  { pkg: Object, config: PhenomicConfig, errors: Array<string> }
) => {
  // Deprecated
  if (config.appcache) {
    if (typeof config.offline !== "undefined") {
      errors.push(
        "phenomic.appcache option was replaced by phenomic.offline option. " +
        " You can't define both of them at the same time."
      )
    }
    config.offline = true

    log(yellow(
      "DEPRECATED: phenomic.appcache option was deprecated " +
      "and will be removed soon. We assumed you want to " +
      "enable offline support, so we used default offline globby pattern " +
      "with AppCache and ServiceWorker. " +
      "Your custom globby pattern was ignore. Please refer the docs to " +
      "update the configuration accordingly"
    ))
  }

  // Disable offline for development if user defined offline config
  if (config.dev && config.offline) {
    config.offline = false
    log(yellow("Offline support is disabled in development mode"))
    return
  }

  if (!config.offline) {
    config.offline = false
    return
  }

  // If config.offline = true ==> set offlineConfig to defaultOfflineConfig
  if (typeof config.offline === "boolean") {
    config.offlineConfig = defaultOfflineConfig
  }
  else if (typeof config.offline === "object") {
    // Merge config with default config
    config.offlineConfig =  {
      ...defaultOfflineConfig,
      ...config.offline,
    }
    // Validate nested config.offline
    if (typeof config.offlineConfig.appcache !== "boolean") {
      errors.push(
        `You provided an '${ typeof config.offlineConfig.appcache }' ` +
        "for 'phenomic.offline.appcache' option. " +
        "This option accepts a boolean value."
      )
    }
    if (typeof config.offlineConfig.serviceWorker !== "boolean") {
      errors.push(
        `You provided an '${ typeof config.offlineConfig.serviceWorker }' ` +
        "for 'phenomic.offline.serviceWorker' option. " +
        "This option accepts a boolean value."
      )
    }
    /*
     * Validate pattern
     */
    if (typeof config.offlineConfig.pattern === "string") {
      config.offlineConfig.pattern = [ config.offlineConfig.pattern ]
    }
    else if (!Array.isArray(config.offlineConfig.pattern)) {
      errors.push(
        `You provided an '${ typeof config.offlineConfig.pattern }' ` +
        "for 'phenomic.offline.pattern' option. " +
        "This option accepts a string or an array."
      )
    }
  }
  else {
    errors.push(
      `Your provided an '${ typeof config.offline }'` +
      "for 'phenomic.offline'. This option accepts a boolean or an object" +
      "with 3 keys: `appcache`, `serviceWorker` and `pattern`"
    )
  }

  if (
    pkg.homepage &&
    parse(pkg.homepage).protocol === "http:" &&
    config.offlineConfig.serviceWorker
  ) {
    console.warn(yellow(
      "ServiceWorker (for Offline access) only works with HTTPS protocol." +
      "You are currently using HTTP, so ServiceWorker will be ignored by " +
      "browsers."
    ))
  }
}
