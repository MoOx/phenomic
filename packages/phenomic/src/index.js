/**
 * @flow
 */
const path = require("path")
const flattenConfiguration = require("./configuration/flattenConfiguration")

const start = require("./commands/start")
const build = require("./commands/build")

function normalizeConfiguration(config: PhenomicInputConfig): PhenomicConfig {
  return {
    path: config.path || process.cwd(),
    outdir: config.outdir || path.join(process.cwd(), "dist"),
    bundler: config.bundler(),
    renderer: config.renderer(),
    plugins: flattenConfiguration(config).map(plugin => plugin()),
    port: config.port || 1414,
  }
}

module.exports = {
  start(config: PhenomicInputConfig) {
    return start(normalizeConfiguration(config))
  },
  build(config: PhenomicInputConfig) {
    return build(normalizeConfiguration(config))
  },
}
