import path from "path";

import express from "express";
import socketIO from "socket.io";
import getProcessForPort from "react-dev-utils/getProcessForPort";
import chalk from "chalk";

import createWatcher from "../watch";
import processFile from "../injection/processFile";
import db from "../db";
import createAPIServer from "../api";
import log from "../utils/log";
import getPath from "../utils/getPath";

const debug = require("debug")("phenomic:core:commands:start");

const getContentPath = (config: PhenomicConfig) =>
  getPath(path.join(config.path, config.content));

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
              m
            );
        });
      }
    })
  );
  return devServer;
}

async function start(config: PhenomicConfig) {
  process.env.NODE_ENV = process.env.NODE_ENV || "development";
  process.env.BABEL_ENV = process.env.BABEL_ENV || "development";
  process.env.PHENOMIC_ENV = "development";
  process.env.PHENOMIC_RESTAPI_PORT = String(config.port);
  debug("starting phenomic server");
  const phenomicServer = createAPIServer({ db, plugins: config.plugins });
  const bundlerServer = await createDevServer({ config });
  const renderers = config.plugins.filter(p => p.getRoutes);
  const renderer: PhenomicPlugin = renderers[0];
  const transformers = config.plugins.filter(
    item => typeof item.transform === "function"
  );

  if (!transformers.length) {
    throw new Error("Phenomic expects at least a transform plugin");
  }
  const collectors = config.plugins.filter(
    item => typeof item.collectFile === "function"
  );
  if (!collectors.length) {
    throw new Error("Phenomic expects at least a collector plugin");
  }
  const io = socketIO(1415);

  try {
    const content = await getContentPath(config);
    const watcher = createWatcher({
      path: content,
      plugins: config.plugins
    });

    watcher.onChange(async function(files) {
      debug("watcher onChange event");
      try {
        await db.destroy();
        await Promise.all(
          files.map(file => processFile({ db, file, transformers, collectors }))
        );
      } catch (e) {
        setTimeout(() => {
          throw e;
        }, 1);
      }
      io.emit("change");
    });
  } catch (e) {
    log.warn(
      `no '${
        config.content
      }' folder found. Please create and put files in this folder if you want the content to be accessible (eg: markdown or JSON files). `
    );
  }

  bundlerServer.use(config.baseUrl.pathname + "phenomic", phenomicServer);
  // $FlowFixMe flow is lost with async function for express
  bundlerServer.get("*", function(req, res) {
    res.type(".html");
    if (typeof renderer.renderDevServer !== "function") {
      res.end(
        "Phenomic renderer requires a 'renderDevServer' function to be exposed"
      );
    } else {
      res.end(
        renderer.renderDevServer({
          assets: res.locals.assets,
          location: req.originalUrl
        })
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
            }`
          )
        );
      } else {
        log(err);
      }
      process.exit(1);
    });
  }
  console.log(
    `✨ Open http://localhost:${config.port}` + config.baseUrl.pathname
  );
}

export default start;
