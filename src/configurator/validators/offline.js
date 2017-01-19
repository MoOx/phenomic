// @flow

import { parse } from "url"

import { yellow, gray } from "chalk"

import log from "../../_utils/log"

export const defaultOfflineConfig: PhenomicOfflineConfig = {
  serviceWorker: true,
  appcache: true,
  cachePatterns: {
    onInstall: [ "/", "phenomic.*" ],
    afterInstall: [ "**", ":assets:" ],
    onDemand: [ ],
    excludes: [ "**/.*", "**/*.map", "**/*.html" ],
  },
}

const knownKeys = Object.keys(defaultOfflineConfig)

export default (
  { pkg, config, errors }:
  { pkg: Object, config: PhenomicOldConfig, errors: Array<string> }
) => {

  if (!config.offline) {
    config.offline = false
    return
  }

  if (config.offline === true) {
    config.offlineConfig = defaultOfflineConfig
  }
  else if (typeof config.offline !== "object") {
    const keys = Object.keys(defaultOfflineConfig)
    errors.push(
      `Your provided an '${ typeof config.offline }'` +
      "for 'phenomic.offline'." +
      "This option accepts a boolean or an object" +
      `with ${ keys.length } keys: ` + keys.join(", ")
    )

    return
  }
  else {
    const userOfflineConfig: PhenomicOfflineConfig = config.offline

    const allKeys = Object.keys(userOfflineConfig)
    const incorrectKeys = allKeys.filter((key) => knownKeys.indexOf(key) === -1)
    if (incorrectKeys.length) {
      errors.push(
        "You provided some key(s) " +
        "for 'phenomic.offline' option " +
        "that are not recognized " +
        `(${ incorrectKeys.join(", ") }). ` +
        ""
      )
    }

    if (typeof userOfflineConfig.serviceWorker !== "boolean") {
      errors.push(
        "You provided an incorrect type"+
        ` ('${ typeof userOfflineConfig.serviceWorker }') ` +
        "for 'phenomic.offline.serviceWorker' option. " +
        "This option accepts a boolean value."
      )
    }

    if (typeof userOfflineConfig.appcache !== "boolean") {
      errors.push(
        "You provided an incorrect type"+
        ` ('${ typeof userOfflineConfig.appcache }') ` +
        "for 'phenomic.offline.appcache' option. " +
        "This option accepts a boolean value."
      )
    }

    // Validate patterns
    const cachePatternsKeys = Object.keys(defaultOfflineConfig.cachePatterns)
    let error
    if (typeof userOfflineConfig.cachePatterns !== "object") {
      error = (
        "You provided an incorrect type"+
        ` ('${ typeof userOfflineConfig.cachePatterns }') ` +
        "for 'phenomic.offline.cachePatterns' option. "
      )
    }
    else {
      const incorrectKeys = Object.keys(userOfflineConfig.cachePatterns)
      .filter(
        (key) => (
          !(cachePatternsKeys.indexOf(key) > -1) ||
          !Array.isArray(userOfflineConfig.cachePatterns[key])
        )
      )
      if (incorrectKeys.length) {
        error = (
          "You provided some key(s) " +
          "for 'phenomic.offline.cachePatterns' option " +
          "that are not recognized or with incorrect types " +
          `(${ incorrectKeys.join(", ") }). ` +
          ""
        )
      }
    }
    if (error) {
      errors.push(
        error +
        "This option accepts a object with " +
        `with ${ cachePatternsKeys.length } keys: ` +
        cachePatternsKeys.join(", ") + " " +
        "that accept array of glob patterns."
      )
    }

    // Merge config with default config
    config.offlineConfig = {
      ...defaultOfflineConfig,
      ...userOfflineConfig,
      cachePatterns: {
        ...defaultOfflineConfig.cachePatterns,
        ...userOfflineConfig.cachePatterns,
      },
    }
  }

  if (
    pkg.homepage &&
    parse(pkg.homepage).protocol !== "https:" &&
    config.offlineConfig.serviceWorker
  ) {
    console.warn(yellow(
      "ServiceWorker (for Offline access) only works with HTTPS protocol." +
      "You are currently using HTTP, so ServiceWorker will be ignored by " +
      "browsers."
    ))
  }

  // Disable offline for development if user defined offline config
  if (config.dev && config.offline && !config.forceOffline) {
    config.offline = false
    config.offlineConfig = {
      serviceWorker: false,
      appcache: false,
      cachePatterns: {},
    }
    log(
      gray(
      "Offline support disabled during development " +
      "(to avoid some false positives)"
      ),
      "warning"
    )
    return
  }
}
