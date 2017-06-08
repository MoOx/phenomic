import path from "path";

import express from "express";
import fsExtra from "fs-extra";

const publicFolderName = "public";

export default function() {
  return {
    name: "@phenomic/plugin-public-assets",
    defineDevMiddleware(server: express$Application, config: PhenomicConfig) {
      server.use(express.static(path.join(config.path, publicFolderName)));
    },
    beforeBuild(config: PhenomicConfig) {
      return new Promise((resolve, reject) => {
        fsExtra.copy(path.join(config.path, publicFolderName), config.outdir, err => {
          if (err) {
            if (err.code === "ENOENT") {
              console.warn(`Warning: ${publicFolderName} folder does not exist. Skipping copy.`);
            } else {
              reject(err);
            }
          }
          resolve();
        });
      });
    }
  };
}
