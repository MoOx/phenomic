import path from "path";

import "isomorphic-fetch";
import jsonFetch from "simple-json-fetch";
import getPort from "get-port";
import createURL from "@phenomic/api-client/lib/url";
import rimraf from "rimraf";

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
      `no '${contentFolder}' folder found. Please create and put files in this folder if you want the content to be accessible (eg: markdown or JSON files). `
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
async function prerenderFileAndDependencies(
  config,
  renderer,
  app,
  phenomicFetch,
  url
) {
  debug(`'${url}': prepend file and deps for `);
  if (!renderer || !renderer.renderServer) {
    throw new Error(
      "a renderer is required (plugin implementing renderServer)"
    );
  }
  const files = await renderer.renderServer(config, app, phenomicFetch, url);
  debug(`'${url}': files & deps collected`);
  return Promise.all(
    files.map(file =>
      writeFile(path.join(config.outdir, file.path), file.contents)
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
    const app = await bundler.buildForPrerendering(config);
    debug("app", app);
    console.log(
      "📦 Webpack server side done " + (Date.now() - lastStamp) + "ms"
    );
    lastStamp = Date.now(); // Retreive content
    await getContent(db, config);
    console.log("📝 Got your content " + (Date.now() - lastStamp) + "ms");
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
    await Promise.all(
      urls.map(url =>
        prerenderFileAndDependencies(config, renderer, app, phenomicFetch, url)
      )
    );
    console.log("📃 Pre-rendering done " + (Date.now() - lastStamp) + "ms");
    lastStamp = Date.now();
    await Promise.all(
      config.plugins
        .filter(plugin => plugin.beforeBuild)
        .map(plugin => plugin.beforeBuild(config))
    );
    await bundler.build(config);
    console.log("📦 Webpack built " + (Date.now() - lastStamp) + "ms");
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
