// @flow
import { yellow } from "chalk"
const log = require("debug")("phenomic:configurator:offline")

const defaultPattern = [ "**", "!**/*.html", "index.html" ]
const defaultOfflineConfig = {
  appcache: true,
  serviceWorker: true,
  pattern: defaultPattern,
}

export default (
  { config, errors }:
  { config: PhenomicConfig, errors: Array<string>}
) => {
  // Deprecated
  if (config.appcache) {
    config.offline = true

    log(yellow(
      "DEPRECATED: phenomic.appcache option is deprecated " +
      "and will be removed soon. We updated your configurator to use " +
      "default offline globby pattern with AppCache and ServiceWorker. " +
      "Your custom globby pattern was ignore. Please refer the docs to " +
      "update the configuration accordingly"
    ))
  }
  // Disable offline for development
  if (config.dev) {
    config.offline = false
    log(yellow("Offline support is disabled in development mode"))
    return
  }

  if (!config.offline) {
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
        "for 'phenomic.offlineConfig.appcache' option. " +
        "This option accepts a boolean value."
      )
    }
    if (typeof config.offlineConfig.serviceWorker !== "boolean") {
      errors.push(
        `You provided an '${ typeof config.offlineConfig.serviceWorker }' ` +
        "for 'phenomic.offlineConfig.serviceWorker' option. " +
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
        "for 'phenomic.offlineConfig.pattern' option. " +
        "This option accepts a string or an array."
      )
    }
  }
  else {
    errors.push(
      `Your prodided an '${ typeof config.offline }'` +
      "for 'phenomic.offline'. This option accepts a boolean or an object" +
      "with 3 keys: `appcache`, `serviceWorker` and `pattern`"
    )
  }
}
