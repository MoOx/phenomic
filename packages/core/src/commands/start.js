// @flow

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
  process.env.PHENOMIC_SOCKET_PORT = String(config.socketPort);
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
  const io = socketIO(config.socketPort);

  const filesPerContentKey = {};

  await Promise.all(
    Object.keys(config.content).map(async contentKey => {
      try {
        let folder;
        let globs;

        // "key(and folder)": ["glob/*"]
        if (Array.isArray(config.content[contentKey])) {
          folder = path.join(config.path, contentKey);
          // $FlowFixMe stfu
          globs = config.content[contentKey];
        } else if (
          config.content[contentKey].root &&
          config.content[contentKey].globs
        ) {
          // "key": {root: folder, globs: ["glob/*"] }
          folder = path.join(config.path, config.content[contentKey].root);
          // $FlowFixMe stfu
          globs = config.content[contentKey].globs;
        } else {
          throw new Error(
            "Unexpected config for 'content' option: " +
              config.content[contentKey].toString()
          );
        }

        const watcher = createWatcher({
          path: await getPath(folder),
          // $FlowFixMe stfu
          patterns: globs
        });

        watcher.onChange(async function(files /* deletedFiles */) {
          // currently our db is stupid: we don't do removal
          // so instead we nuke the db each times there is a tiny change
          // for now it's not creating any problem, but it's clearly something
          // we need to improve for HUGE website
          // @todo: don't nuke the db and think about a way to remove deleted
          // files & related injected data (see collector-files)
          filesPerContentKey[contentKey] = files;
          debug("watcher onChange event");
          try {
            await db.destroy();
            await Promise.all(
              Object.keys(filesPerContentKey).map(
                async localContentKey =>
                  await Promise.all(
                    filesPerContentKey[localContentKey].map(file => {
                      return processFile({
                        db,
                        fileKey: localContentKey,
                        file,
                        transformers,
                        collectors
                      });
                    })
                  )
              )
            );
          } catch (e) {
            setTimeout(() => {
              throw e;
            }, 1);
          }
          // note: we could emit faster but does it's worth it?
          io.emit("change");
        });
      } catch (e) {
        log.warn(
          `no '${
            contentKey
          }' folder found or unable to read files. Please create and put files in this folder (or double check it) if you want the content to be accessible (eg: markdown or JSON files). `
        );
      }
    })
  );

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
