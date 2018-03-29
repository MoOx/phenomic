import path from "path";

import express from "express";
import fse from "fs-extra";
import logger from "@phenomic/core/lib/logger";
import getPath from "@phenomic/core/lib/utils/getPath";

type options = {
  path: string
};

const pluginName = "@phenomic/plugin-public-assets";
const log = logger(pluginName);

const defaultOptions = {
  path: "public"
};

const publicAssets: PhenomicPluginModule<options> = (
  config: PhenomicConfig,
  options = defaultOptions
) => {
  const warnNoPublic = () => {
    log.warn(
      `No '${
        options.path
      }' folder found. Please create this folder if you want static files to be served from the root (eg: favicon.ico).`
    );
  };
  return {
    name: pluginName,
    addDevServerMiddlewares() {
      return getPath(path.join(config.path, options.path)).then(
        (publicPath: string) => [express.static(publicPath)],
        () => {
          warnNoPublic();
          return [];
        }
      );
    },
    beforeBuild() {
      return new Promise((resolve, reject) => {
        getPath(path.join(config.path, options.path)).then(
          (publicPath: string) => {
            fse.copy(publicPath, path.join(config.path, config.outdir), err => {
              if (err) {
                reject(err);
              }
              resolve();
            });
          },
          () => {
            warnNoPublic();
            resolve();
          }
        );
      });
    }
  };
};

export default publicAssets;
