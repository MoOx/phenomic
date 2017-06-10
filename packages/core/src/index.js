import cosmiconfig from "cosmiconfig";

import defaultConfig from "./defaultConfig.js";
import flattenConfiguration from "./configuration/flattenConfiguration.js";
import start from "./commands/start.js";
import build from "./commands/build.js";

const shittyCatch = error => {
  setTimeout(() => {
    throw error;
  }, 1);
};

function normalizeConfiguration(
  config: PhenomicInputConfig = {}
): Promise<PhenomicConfig> {
  const configExplorer = cosmiconfig("phenomic", { cache: false });
  return configExplorer
    .load(process.cwd())
    .then(result => {
      if (result === null) {
        throw new Error(
          "No configuration file found. Please add a 'phenomic' section in package.json or " +
            "create a file named .phenomicrc(.json|.yaml)? or phenomic.config.js." +
            "\nSee https://phenomic.io/docs/usage/configuration/"
        );
      }
      return flattenConfiguration({
        ...defaultConfig,
        ...result.config,
        ...config
      });
    })
    .catch(shittyCatch);
}

export default {
  start(config: PhenomicInputConfig = {}) {
    normalizeConfiguration(config).then(start).catch(shittyCatch);
  },
  build(config: PhenomicInputConfig = {}) {
    normalizeConfiguration(config).then(build).catch(shittyCatch);
  }
};
