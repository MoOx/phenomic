const debug = require("debug")("phenomic:plugin:public-assets");
const express = require("express");
const path = require("path");

export default function() {
  return {
    name: "@phenomic/plugin-public-assets",
    defineDevMiddleware(server: express$Application, config: PhenomicConfig) {
      server.use(express.static(path.join(config.path, "public")));
    },
    beforeBuild(config: PhenomicConfig) {
      return new Promise((resolve, reject) => {
        const fsExtra = require("fs-extra");
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
