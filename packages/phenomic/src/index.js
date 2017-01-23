/**
 * @flow
 */
import path from "path"

import flattenConfiguration from "./configuration/flattenConfiguration"
import start from "./commands/start"
import build from "./commands/build"

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

export default {
  start(config: PhenomicInputConfig) {
    return start(normalizeConfiguration(config))
  },
  build(config: PhenomicInputConfig) {
    return build(normalizeConfiguration(config))
  },
}
