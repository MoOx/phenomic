import path from "path";

import logSymbols from "log-symbols";
import getPort from "get-port";
import rimraf from "rimraf";
import pMap from "p-map";

import { oneShot } from "../watch";
import processFile from "../injection/processFile";
import createServer from "../api";
import writeFile from "../utils/writeFile";
import db from "../db";
import log from "../utils/log";
import getPath from "../utils/getPath";

const debug = require("debug")("phenomic:core:commands:build");

const getContentPath = (config: PhenomicConfig) =>
  getPath(path.join(config.path, config.content));

let lastStamp = Date.now();
async function getContent(db, config: PhenomicConfig) {
  debug("getting content");
  const transformers = config.plugins.filter(
    item => typeof item.transform === "function"
  );
  if (!transformers.length) {
    throw Error("Phenomic expects at least a transform plugin");
  }
  const collectors = config.plugins.filter(
    item => typeof item.collectFile === "function"
  );
  if (!collectors.length) {
    throw Error("Phenomic expects at least a collector plugin");
  }

  let contentPath;
  try {
    contentPath = await getContentPath(config);
  } catch (e) {
    log.warn(
      `no '${
        config.content
      }' folder found. Please create and put files in this folder if you want the content to be accessible (eg: markdown or JSON files). `
    );
  }

  if (contentPath) {
    const files = oneShot({
      path: contentPath,
      plugins: config.plugins
    });
    await db.destroy();
    await Promise.all(
      files.map(file =>
        processFile({
          db,
          file,
          transformers,
          collectors
        })
      )
    );
  }
}

async function build(config: PhenomicConfig) {
  console.log("⚡️ Hey! Let's get on with it");
  debug("cleaning dist");
  rimraf.sync("dist");

  process.env.NODE_ENV = process.env.NODE_ENV || "production";
  process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
  process.env.PHENOMIC_ENV = "static";
  process.env.PHENOMIC_RESTAPI_PORT = String(await getPort());
  debug("building");
  debug("process.env.NODE_ENV", process.env.NODE_ENV);
  debug("process.env.BABEL_ENV", process.env.BABEL_ENV);
  debug("process.env.PHENOMIC_ENV", process.env.PHENOMIC_ENV);
  debug("process.env.PHENOMIC_RESTAPI_PORT", process.env.PHENOMIC_RESTAPI_PORT);
  const phenomicAPIServer = createServer({ db, plugins: config.plugins });
  const runningPhenomicAPIServer = phenomicAPIServer.listen(
    parseInt(process.env.PHENOMIC_RESTAPI_PORT, 10)
  );
  debug("server ready");
  try {
    const bundlers = config.plugins.filter(p => p.buildForPrerendering);
    const bundler = bundlers[0];
    await Promise.all(
      config.plugins.map(plugin => plugin.beforeBuild && plugin.beforeBuild())
    );
    if (!bundler || !bundler.build) {
      throw new Error("a bundler is required (plugin implementing `build`)");
    }
    const assets = await bundler.build();
    debug("assets", assets);
    console.log(
      "📦 Webpack client build done " + (Date.now() - lastStamp) + "ms"
    );
    lastStamp = Date.now();
    if (!bundler || !bundler.buildForPrerendering) {
      throw new Error(
        "a bundler is required (plugin implementing `buildForPrerendering`)"
      );
    }
    const app = await bundler.buildForPrerendering();
    debug("app", app);
    console.log(
      "📦 Webpack static build done " + (Date.now() - lastStamp) + "ms"
    );
    lastStamp = Date.now(); // Retreive content
    await getContent(db, config);
    console.log("📝 Content processed " + (Date.now() - lastStamp) + "ms");
    lastStamp = Date.now();
    const renderers: PhenomicPlugins = config.plugins.filter(p => p.getRoutes);
    const renderer = renderers[0];
    if (!renderer || !renderer.getRoutes) {
      throw new Error(
        "a renderer is required (plugin implementing `getRoutes`)"
      );
    }
    const routes = renderer.getRoutes(app);
    let nbUrls = 0;
    await Promise.all(
      config.plugins.map(async plugin => {
        if (!plugin.resolveURLs) {
          debug("nor 'resolveURLs' method for plugin ", plugin.name);
          return;
        }
        if (!plugin.renderStatic) {
          debug("nor 'renderStatic' method for plugin ", plugin.name);
          return;
        }
        if (typeof plugin.resolveURLs !== "function") {
          throw new Error(
            `'resolveURLs' method from ${
              plugin.name
            } must be a function, received '${typeof plugin.resolveURLs}'`
          );
        }
        if (typeof plugin.renderStatic !== "function") {
          throw new Error(
            `'renderStatic' method from ${
              plugin.name
            } must be a function, received '${typeof plugin.renderStatic}'`
          );
        }
        const renderStatic = plugin.renderStatic;
        const urls = await plugin.resolveURLs({
          routes
        });
        nbUrls += urls.length;
        debug("urls have been resolved for ", plugin.name, urls);
        await pMap(
          urls,
          async location => {
            debug(`'${location}': prepend file and deps`);
            const files = await renderStatic({
              app,
              assets,
              location
            });
            debug(`'${location}': files & deps collected`, files);
            return Promise.all(
              files.map(file =>
                writeFile(
                  path.join(config.outdir, decodeURIComponent(file.path)),
                  file.contents
                )
              )
            );
          },
          { concurrency: 50 }
        );
      })
    );
    if (nbUrls === 0) {
      console.log(
        `${
          logSymbols.warning
        } No URLs resolved. You should probably double-check your routes. If you are using a single '*' route, you need to add an '/' to get a least a static entry point.`
      );
    }
    console.log("📃 Pre-rendering finished " + (Date.now() - lastStamp) + "ms");

    await Promise.all(
      config.plugins.map(plugin => plugin.afterBuild && plugin.afterBuild())
    );
    console.log(
      "📃 After build hook finished " + (Date.now() - lastStamp) + "ms"
    );

    lastStamp = Date.now();
    if (runningPhenomicAPIServer) {
      runningPhenomicAPIServer.close();
    }
    debug("server closed");
  } catch (error) {
    if (runningPhenomicAPIServer) {
      runningPhenomicAPIServer.close();
    }
    debug("server closed due to error");
    throw error;
  }
}
export default (options: Object) => build(options);
