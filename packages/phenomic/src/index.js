import path from "path"

import flattenConfiguration from "./configuration/flattenConfiguration"
import start from "./commands/start"
import build from "./commands/build"

const normalizePlugin = (plugin) => {
  if (!plugin) {
    throw new Error(
      "phenomic: You provided an undefined plugin"
    )
  }

  if (typeof plugin !== "function") {
    throw new Error(
      "phenomic: You provided an plugin with type is " +
      typeof plugin +
      ". But function is expected instead of " +
      plugin
    )
  }

  // @todo send config here
  return plugin()
}

function normalizeConfiguration(config: PhenomicInputConfig): PhenomicConfig {
  return {
    path: config.path || process.cwd(),
    outdir: config.outdir || path.join(process.cwd(), "dist"),
    plugins: flattenConfiguration(config).map(normalizePlugin),
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
