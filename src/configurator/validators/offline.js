// @flow

import { yellow, gray } from "chalk"
import log from "../../_utils/log"

import { parse } from "url"

export const defaultOfflineConfig: PhenomicOfflineConfig = {
  serviceWorker: true,
  appcache: {
    onInstall: true,
    afterInstall: true,
    // onDemand: false, // cannot be done
  },
  cachePatterns: {
    onInstall: [ "/", "phenomic.*" ],
    afterInstall: [ "**", ":assets:" ],
    onDemand: [ ],
    excludes: [ "**/.*", "**/*.map", "**/*.html" ],
  },
}

export default (
  { pkg, config, errors }:
  { pkg: Object, config: PhenomicConfig, errors: Array<string> }
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

    // Validate nested config.offline
    if (typeof userOfflineConfig.appcache !== "boolean") {
      const possibleKeys = Object.keys(defaultOfflineConfig.appcache)
      let error = false
      if (typeof userOfflineConfig.appcache !== "object") {
        error = (
          "You provided an incorrect type"+
          ` ('${ typeof userOfflineConfig.appcache }') ` +
          "for 'phenomic.offline.appcache' option. "
        )
      }
      else {
        const unknownKeys = Object.keys(userOfflineConfig.appcache).filter(
          (key) => (
            !(possibleKeys.indexOf(key) > -1) ||
            typeof userOfflineConfig.appcache[key] !== "boolean"
          )
        )
        if (unknownKeys.length) {
          error = (
            "You provided some key(s)" +
            "for 'phenomic.offline.appcache' option that are not recognized " +
            `(${ unknownKeys.join(", ") }). `
          )
        }
      }
      if (error) {
        errors.push(
          error +
          "This option accepts a boolean value or an object " +
          " { [key]: boolean } with the following keys: " +
          possibleKeys.join(", ")
        )
      }
    }
    if (typeof userOfflineConfig.serviceWorker !== "boolean") {
      errors.push(
        "You provided an incorrect type"+
        ` ('${ typeof userOfflineConfig.serviceWorker }') ` +
        "for 'phenomic.offline.serviceWorker' option. " +
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
      appcache: (
        userOfflineConfig.appcache === true
        ? defaultOfflineConfig.appcache
        : (
          typeof userOfflineConfig.appcache === "object"
          ? {
            ...defaultOfflineConfig.appcache,
            ...userOfflineConfig.appcache,
          }
          : defaultOfflineConfig.appcache
        )
      ),
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
  if (config.dev && config.offline) {
    config.offlineConfig.appcache = {}
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
