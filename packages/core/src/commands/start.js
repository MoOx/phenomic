// @flow

import express from "express";
import getProcessForPort from "react-dev-utils/getProcessForPort";
import chalk from "chalk";

import createDB from "../db";
import createAPIServer from "../api";
import log from "../utils/log";

const debug = require("debug")("phenomic:core:commands:start");

async function createDevServer({ config }: { config: PhenomicConfig }) {
  debug("creating dev server");
  const devServer = express();
  await Promise.all(
    config.plugins.map(async plugin => {
      if (plugin.addDevServerMiddlewares)
        debug("adding dev server middlewares for " + plugin.name);
      if (plugin.addDevServerMiddlewares) {
        return (await plugin.addDevServerMiddlewares()).map(async m => {
          const resolved = await m;
          if (resolved) devServer.use(resolved);
          else
            debug(
              "A middleware hasn't returned anything for " + plugin.name,
              ", skipping",
              m,
            );
        });
      }
    }),
  );
  return devServer;
}

async function start(config: PhenomicConfig) {
  process.env.NODE_ENV = process.env.NODE_ENV || "development";
  process.env.BABEL_ENV = process.env.BABEL_ENV || "development";
  process.env.PHENOMIC_ENV = "development";
  process.env.PHENOMIC_RESTAPI_PORT = String(config.port);
  process.env.PHENOMIC_SOCKET_PORT = String(config.socketPort);
  debug("starting phenomic server");
  const db = createDB(config.db);
  const renderers = config.plugins.filter(p => p.getRoutes);
  const renderer: PhenomicPlugin = renderers[0];
  const transformers = config.plugins.filter(plugin => plugin.transform);
  // collectors
  await Promise.all(
    config.plugins.map(p => p.collect && p.collect({ db, transformers })),
  );

  const phenomicServer = createAPIServer({
    db,
    plugins: config.plugins,
    rootPath: config.baseUrl.pathname + "phenomic",
  });
  const bundlerServer = await createDevServer({ config });
  bundlerServer.use(phenomicServer);
  // $FlowFixMe flow is lost with async function for express
  bundlerServer.get("*", function(req, res) {
    res.type(".html");
    if (typeof renderer.renderDevServer !== "function") {
      res.end(
        "Phenomic renderer requires a 'renderDevServer' function to be exposed",
      );
    } else {
      res.end(
        renderer.renderDevServer({
          assets: res.locals.assets,
          location: req.originalUrl,
        }),
      );
    }
  });
  const server = bundlerServer.listen(config.port);
  if (server) {
    server.on("error", err => {
      if (err.errno === "EADDRINUSE") {
        const existingProcess = getProcessForPort(err.port);
        log(
          chalk.yellow(
            `Something is already running on port ${err.port}. ${
              existingProcess ? `Probably:\n${existingProcess}\n` : ""
            }`,
          ),
        );
      } else {
        log(err);
      }
      process.exit(1);
    });
  }
  console.log(
    `✨ Open http://localhost:${config.port}` + config.baseUrl.pathname,
  );
}

export default start;
