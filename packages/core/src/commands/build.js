// @flow

import path from "path";

import getPort from "get-port";
import rimraf from "rimraf";
import pMap from "p-map";

import createAPIServer from "../api";
import writeFile from "../utils/writeFile";
import createDB from "../db";
import log from "../utils/log";
import errorFormatter from "../utils/error-formatter";
import Utils from "../Utils.bs.js";

const debug = require("debug")("phenomic:core:commands:build");

let lastStamp = Date.now();
const startStamp = lastStamp;

async function build(config: PhenomicConfig) {
  log("⚡️ Starting engine...");
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
  const db = createDB(config.db);
  const phenomicAPIServer = createAPIServer({
    db,
    plugins: config.plugins,
    rootPath: config.baseUrl.pathname + "phenomic",
  });
  const runningPhenomicAPIServer = phenomicAPIServer.listen(
    parseInt(process.env.PHENOMIC_RESTAPI_PORT, 10),
  );
  debug("server ready");
  try {
    log("Building client bundle...");
    const bundlers = config.plugins.filter(p => p.buildForPrerendering);
    const bundler = bundlers[0];
    await Promise.all(
      config.plugins.map(plugin => plugin.beforeBuild && plugin.beforeBuild()),
    );
    if (!bundler || !bundler.build) {
      throw new Error("a bundler is required (plugin implementing `build`)");
    }
    const assets = await bundler.build();
    debug("assets", assets);
    log.success("📦 Client bundle done " + Utils.durationSince(lastStamp));
    lastStamp = Date.now();
    log("Bulding static bundle...");
    if (!bundler || !bundler.buildForPrerendering) {
      throw new Error(
        "a bundler is required (plugin implementing `buildForPrerendering`)",
      );
    }
    const app = await bundler.buildForPrerendering();
    debug("app", app);
    log.success("📦 Static bundle done " + Utils.durationSince(lastStamp));
    log("Processing content...");
    lastStamp = Date.now();

    const transformers = config.plugins.filter(plugin => plugin.transform);
    // collectors
    await Promise.all(
      config.plugins.map(p => p.collect && p.collect({ db, transformers })),
    );

    log.success("📝 Content processed " + Utils.durationSince(lastStamp));
    log("Starting static pre-rendering...");
    lastStamp = Date.now();
    const renderers: PhenomicPlugins = config.plugins.filter(p => p.getRoutes);
    const renderer = renderers[0];
    if (!renderer || !renderer.getRoutes) {
      throw new Error(
        "a renderer is required (plugin implementing `getRoutes`)",
      );
    }
    const routes = renderer.getRoutes(app);
    let nbUrls = 0;
    let nbUrlsFailed = 0;
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
            } must be a function, received '${typeof plugin.resolveURLs}'`,
          );
        }
        if (typeof plugin.renderStatic !== "function") {
          throw new Error(
            `'renderStatic' method from ${
              plugin.name
            } must be a function, received '${typeof plugin.renderStatic}'`,
          );
        }
        const renderStatic = plugin.renderStatic;
        const urls = await plugin.resolveURLs({
          routes,
        });
        nbUrls += urls.length;
        debug("urls have been resolved for ", plugin.name, urls);
        await pMap(
          urls,
          async location => {
            debug(`'${location}': prepend file and deps`);
            try {
              const files = await renderStatic({
                app,
                assets,
                location,
              });
              debug(`'${location}': files & deps collected`, files);
              return Promise.all(
                files.map(file =>
                  writeFile(
                    path.join(config.outdir, decodeURIComponent(file.path)),
                    file.contents,
                  ),
                ),
              );
            } catch (e) {
              // do not crash entire build, just log and continue
              nbUrlsFailed++;
              const betterError = errorFormatter(e);
              log.warn(
                "An url failed to pre-render /" +
                  location +
                  ":\n" +
                  (betterError.stack
                    ? betterError.stack
                    : betterError.toString()),
              );
              return Promise.resolve([]);
            }
          },
          { concurrency: 50 },
        );
      }),
    );
    if (nbUrls === 0) {
      log.warn(
        `No URLs resolved. You should probably double-check your routes. If you are using a single '*' route, you need to add an '/' to get a least a static entry point.`,
      );
    }
    const now = Date.now();
    log.success(
      "📦 Static pre-rendering done " +
        Utils.durationSince(lastStamp, now) +
        ` (${nbUrls} file${nbUrls > 1 ? "s" : ""} ≈ ${Math.ceil(
          (now - lastStamp) / nbUrls,
        )}ms/file)`,
    );
    lastStamp = Date.now();

    const pluginsWithAfterBuildHooks = config.plugins.filter(
      plugin => typeof plugin.afterBuild === "function",
    );
    if (pluginsWithAfterBuildHooks.length > 0) {
      await Promise.all(
        pluginsWithAfterBuildHooks.map(
          plugin => plugin.afterBuild && plugin.afterBuild(),
        ),
      );
      log.success(
        "After build hook finished " + Utils.durationSince(lastStamp),
      );
      lastStamp = Date.now();
    }

    if (runningPhenomicAPIServer) {
      runningPhenomicAPIServer.close();
    }
    debug("server closed");
    if (nbUrlsFailed === 0) {
      log.success("Build done " + Utils.durationSince(startStamp));
    } else {
      log.error(
        `${nbUrlsFailed} file${
          nbUrlsFailed > 1 ? "s" : ""
        } have not been pre-rendered. See errors above for more details`,
      );
      log.warn("Build done with errors " + Utils.durationSince(startStamp));
      process.exit(2);
    }
  } catch (error) {
    if (runningPhenomicAPIServer) {
      runningPhenomicAPIServer.close();
    }
    debug("server closed due to error");
    log.error("Build failed " + Utils.durationSince(startStamp));
    throw error;
  }
}
export default (options: Object) => build(options);
