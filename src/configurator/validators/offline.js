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
  // Disable offline for development
  if (config.dev) {
    config.offline = false
    log(yellow("Offline support is disabled in development mode"))
    return
  }

  if (!config.offline) {
    return
  }

  if (!config.offlineConfig) {
    config.offlineConfig = defaultOfflineConfig
  }
  else {
    // Merge with default config
    config.offlineConfig = {
      ...defaultOfflineConfig,
      ...config.offlineConfig,
    }

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
        "This option accepts a string, or an array."
      )
    }
  }
}
