import path from "path";

import logSymbols from "log-symbols";
import "isomorphic-fetch";
import jsonFetch from "simple-json-fetch";
import getPort from "get-port";
import createURL from "@phenomic/api-client/lib/url";
import rimraf from "rimraf";
import pMap from "p-map";

import { oneShot } from "../watch";
import processFile from "../injection/processFile";
import createServer from "../api";
import writeFile from "../utils/writeFile";
import resolveURLsToPrerender from "../prerender/resolve";
import db from "../db";
import log from "../utils/log";
import getPath from "../utils/getPath";

const debug = require("debug")("phenomic:core:commands:build");

const contentFolder = "content";
const getContentPath = (config: PhenomicConfig) =>
  getPath(path.join(config.path, contentFolder));

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
    item => typeof item.collect === "function"
  );
  if (!collectors.length) {
    throw Error("Phenomic expects at least a collector plugin");
  }

  try {
    const contentPath = await getContentPath(config);
    const files = oneShot({
      path: contentPath,
      plugins: config.plugins
    });
    await db.destroy();
    await Promise.all(
      files.map(file =>
        processFile({
          config,
          db,
          file,
          transformers,
          collectors
        })
      )
    );
  } catch (e) {
    log.warn(
      `no '${
        contentFolder
      }' folder found. Please create and put files in this folder if you want the content to be accessible (eg: markdown or JSON files). `
    );
  }
}
function createFetchFunction(port: number) {
  debug("creating fetch function");
  return (config: PhenomicQueryConfig) => {
    return jsonFetch(
      createURL({
        ...config,
        root: `http://localhost:${port}`
      })
    ).then(res => res.json);
  };
}
async function prerenderFileAndDependencies({
  config,
  renderer,
  app,
  assets,
  phenomicFetch,
  location
}: {
  config: PhenomicConfig,
  renderer: PhenomicPlugin,
  app: PhenomicAppType,
  assets: PhenomicAssets,
  phenomicFetch: PhenomicFetch,
  location: string
}) {
  debug(`'${location}': prepend file and deps for `);
  if (!renderer || !renderer.renderStatic) {
    throw new Error(
      "a renderer is required (plugin implementing 'renderStatic')"
    );
  }
  const files = await renderer.renderStatic({
    config,
    app,
    assets,
    phenomicFetch,
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
}
async function build(config) {
  console.log("⚡️ Hey! Let's get on with it");
  debug("cleaning dist");
  rimraf.sync("dist");

  process.env.NODE_ENV = process.env.NODE_ENV || "production";
  process.env.BABEL_ENV = process.env.BABEL_ENV || "production";
  process.env.PHENOMIC_ENV = "static";
  debug("building");
  const phenomicServer = createServer(db, config.plugins);
  const port = await getPort();
  const runningServer = phenomicServer.listen(port);
  debug("server ready");
  try {
    const bundlers = config.plugins.filter(p => p.buildForPrerendering);
    const bundler = bundlers[0]; // Build webpack
    await Promise.all(
      config.plugins
        .filter(plugin => plugin.beforeBuild)
        .map(plugin => plugin.beforeBuild(config))
    );
    const assets = await bundler.build(config);
    debug("assets", assets);
    console.log(
      "📦 Webpack client build done " + (Date.now() - lastStamp) + "ms"
    );
    lastStamp = Date.now();
    const app = await bundler.buildForPrerendering(config);
    debug("app", app);
    console.log(
      "📦 Webpack static build done " + (Date.now() - lastStamp) + "ms"
    );
    lastStamp = Date.now(); // Retreive content
    await getContent(db, config);
    console.log("📝 Content processed " + (Date.now() - lastStamp) + "ms");
    lastStamp = Date.now();
    const phenomicFetch = createFetchFunction(port);
    const renderers: PhenomicPlugins = config.plugins.filter(p => p.getRoutes);
    const renderer = renderers[0];
    if (!renderer || !renderer.getRoutes) {
      throw new Error("a renderer is required (plugin implementing getRoutes)");
    }
    const urls = await resolveURLsToPrerender(
      renderer.getRoutes(app),
      phenomicFetch
    );
    debug("urls have been resolved");
    debug(urls);
    if (urls.length === 0) {
      console.log(
        `${
          logSymbols.warning
        } No URLs resolved. You should probably double-check your routes. If you are using a single '*' route, you need to add an '/' to get a least a static entry point.`
      );
    }
    await pMap(
      urls,
      location =>
        prerenderFileAndDependencies({
          config,
          renderer,
          app,
          assets,
          phenomicFetch,
          location
        }),
      { concurrency: 50 }
    );
    console.log("📃 Pre-rendering finished " + (Date.now() - lastStamp) + "ms");
    lastStamp = Date.now();
    runningServer.close();
    debug("server closed");
  } catch (error) {
    runningServer.close();
    debug("server closed due to error");
    throw error;
  }
}
export default (options: Object) => build(options);
