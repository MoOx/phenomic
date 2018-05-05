// @flow

import cosmiconfig from "cosmiconfig";
import serve from "serve";

import flattenConfiguration from "./configuration/flattenConfiguration.js";
import start from "./commands/start.js";
import build from "./commands/build.js";
import log from "./utils/log.js";

const shittyCatch = error => {
  setTimeout(() => {
    throw error;
  }, 1);
};

function normalizeConfiguration(
  config?: PhenomicInputConfig
): Promise<PhenomicConfig> {
  const configExplorer = cosmiconfig("phenomic", { cache: false });
  return configExplorer
    .load(process.cwd())
    .then(result => {
      if (result === null) {
        throw new Error(
          "No configuration file found. Please add a 'phenomic' section in package.json or " +
            "create a file named .phenomicrc(.json|.yaml)? or phenomic.config.js." +
            "\nSee https://phenomic.io/docs/configuration/"
        );
      }
      return flattenConfiguration({
        ...result.config,
        ...(config || {})
      });
    })
    .catch(shittyCatch);
}

export default {
  start(inputConfig?: PhenomicInputConfig) {
    normalizeConfiguration(inputConfig)
      .then(start)
      .catch(shittyCatch);
  },
  build(inputConfig?: PhenomicInputConfig) {
    normalizeConfiguration(inputConfig)
      .then(build)
      .catch(shittyCatch);
  },
  async preview(inputConfig?: PhenomicInputConfig) {
    try {
      const config = await normalizeConfiguration(inputConfig);
      await build(config);
      log(
        `⚡️ Serving on http://localhost:${config.port}` +
          config.baseUrl.pathname
      );
      serve(config.outdir, {
        port: config.port
      });
    } catch (e) {
      shittyCatch(e);
    }
  }
};
