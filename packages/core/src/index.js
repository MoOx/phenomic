// @flow

import cosmiconfig from "cosmiconfig";
import serve from "serve";

import flattenConfiguration from "./configuration/flattenConfiguration.js";
import start from "./commands/start.js";
import build from "./commands/build.js";
import log from "./utils/log.js";

const handleError = error => {
  if (error.message) log.error(error.message);
  if (error.stack) log.error(error.stack);
  process.exit(1);
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
    .catch(handleError);
}

export default {
  start(inputConfig?: PhenomicInputConfig) {
    normalizeConfiguration(inputConfig)
      .then(start)
      .catch(handleError);
  },
  build(inputConfig?: PhenomicInputConfig) {
    normalizeConfiguration(inputConfig)
      .then(build)
      .catch(handleError);
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
      handleError(e);
    }
  }
};
