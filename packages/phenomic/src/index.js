import path from "path"

import cosmiconfig from "cosmiconfig"

import pkg from "../package.json"

import flattenConfiguration from "./configuration/flattenConfiguration.js"
import start from "./commands/start.js"
import build from "./commands/build.js"

const debug = require("debug")("phenomic:core")

const defaultConfig = {
  path: process.cwd(),
  outdir: path.join(process.cwd(), "dist"),
  port: 3333,
}

const normalizePlugin = (plugin) => {
  if (!plugin) {
    throw new Error(
      "phenomic: You provided an undefined plugin"
    )
  }

  debug("plugin", plugin.name, typeof plugin)

  if (typeof plugin !== "function") {
    throw new Error(
      "phenomic: You provided an plugin with type is " +
      typeof plugin +
      ". But function is expected instead of " +
      plugin
    )
  }

  // @todo send config here ?
  const pluginInstance = plugin()

  if (Array.isArray(pluginInstance)) {
    throw new Error("Array of plugins should be specified in 'presets' section of your configuration")
  }

  return pluginInstance
}

const shittyCatch = (error) => {
  setTimeout(() => {
    throw error
  }, 1)
}

function normalizeConfiguration(config: PhenomicInputConfig = {}): Promise<PhenomicConfig> {
  const configExplorer = cosmiconfig(pkg.name, { cache: false })
  return configExplorer.load(process.cwd())
    .then((result) => {
      if (result === null) {
        throw new Error(
          "No configuration file found. Please add a 'phenomic' section in package.json or " +
          "create a file named .phenomicrc(.json|.yaml)? or phenomic.config.js." +
          "\nSee https://phenomic.io/docs/usage/configuration/"
        )
      }
      const normalizedConfig = {
        ...defaultConfig,
        ...result.config,
        ...config,
      }
      normalizedConfig.plugins = flattenConfiguration(normalizedConfig).map(normalizePlugin)
      delete normalizedConfig.presets
      return normalizedConfig
    })
    .catch(shittyCatch)
}

export default {
  start(config: PhenomicInputConfig = {}) {
    normalizeConfiguration(config).then(start).catch(shittyCatch)
  },
  build(config: PhenomicInputConfig = {}) {
    normalizeConfiguration(config).then(build).catch(shittyCatch)
  },
}
