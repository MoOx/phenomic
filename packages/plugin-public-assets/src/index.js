import path from "path";

import express from "express";
import fse from "fs-extra";
import logger from "@phenomic/core/lib/logger";
import getPath from "@phenomic/core/lib/utils/getPath";

export type PhenomicPluginPublicAssetsOptionsType = {
  path: string
};

const pluginName = "@phenomic/plugin-public-assets";
const log = logger(pluginName);

const defaultOptions = {
  path: "public"
};

export default function(
  options: PhenomicPluginPublicAssetsOptionsType = defaultOptions
) {
  const warnNoPublic = (): void => {
    log.warn(
      `No '${
        options.path
      }' folder found. Please create this folder if you want static files to be served from the root (eg: favicon.ico).`
    );
  };
  return {
    name: pluginName,
    addDevServerMiddlewares(config: PhenomicConfig) {
      return [
        getPath(path.join(config.path, options.path)).then(
          (publicPath: string) => express.static(publicPath),
          warnNoPublic
        )
      ];
    },
    beforeBuild(config: PhenomicConfig): Promise<void> {
      return new Promise((resolve, reject) => {
        getPath(path.join(config.path, options.path)).then(
          (publicPath: string) => {
            fse.copy(publicPath, config.outdir, err => {
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
}
