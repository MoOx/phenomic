import path from "path";

import express from "express";
import fsExtra from "fs-extra";

export default function() {
  return {
    name: "@phenomic/plugin-public-assets",
    defineDevMiddleware(server: express$Application, config: PhenomicConfig) {
      server.use(express.static(path.join(config.path, "public")));
    },
    beforeBuild(config: PhenomicConfig) {
      return new Promise((resolve, reject) => {
        fsExtra.copy(path.join(config.path, "public"), config.outdir, err => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      });
    }
  };
}
