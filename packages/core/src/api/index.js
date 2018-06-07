// @flow

import express from "express";

import pkg from "../../package.json";
import log from "../utils/log";

import { encode, decode } from "./helpers";

const debug = require("debug")("phenomic:core:api");

const connect = (list, limit, previousList = []) => {
  const hasNextPage = limit === undefined ? false : list.length > limit;
  const hasPreviousPage = previousList.length > 0;
  const previousPageIsFirst = limit ? previousList.length <= limit : false;
  // we are retrieving limit + 1 to know if there is more page or not
  // so when getting the previous item, we need to check if we want the last
  // item or the one before (since we added one to the limit)
  const previousIndex = previousList.length - 1 - (previousPageIsFirst ? 0 : 1);
  const nextIndex = list.length - 1;
  return {
    previousPageIsFirst,
    previous:
      hasPreviousPage && previousList[previousIndex]
        ? encode(previousList[previousIndex].id)
        : undefined,
    next:
      hasNextPage && list[nextIndex] ? encode(list[nextIndex].id) : undefined,
    list: list.slice(0, limit)
  };
};

function createAPIServer({
  db,
  plugins,
  rootPath
}: {|
  db: PhenomicDB,
  plugins: PhenomicPlugins,
  rootPath: string
|}) {
  debug("creating server");
  const apiServer = express();

  apiServer.get(rootPath + "/", async function(
    req: express$Request,
    res: express$Response
  ) {
    debug("get api version");
    res.json({
      engine: "phenomic",
      version: pkg.version
    });
  });

  apiServer.get(
    rootPath + "/:path/by-:filter/:value/:order/:sort.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params));
      try {
        const sort = req.params.sort;
        const reverse = req.params.order === "desc";
        const list = await db.getList(
          req.params.path,
          {
            sort,
            reverse
          },
          req.params.filter,
          req.params.value
        );
        res.json(connect(list));
      } catch (error) {
        log.error(error.message);
        debug(error);
        res.status(404).end();
      }
    }
  );

  apiServer.get(
    rootPath + "/:path/by-:filter/:value/:order/:sort/limit-:limit.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params));
      try {
        const limit = parseInt(req.params.limit);
        const sort = req.params.sort;
        const reverse = req.params.order === "desc";
        const list = await db.getList(
          req.params.path,
          {
            limit: limit + 1,
            sort,
            reverse
          },
          req.params.filter,
          req.params.value
        );
        res.json(connect(list, limit));
      } catch (error) {
        log.error(error.message);
        debug(error);
        res.status(404).end();
      }
    }
  );

  apiServer.get(
    rootPath +
      "/:path/by-:filter/:value/:order/:sort/limit-:limit/after-:after.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params));
      try {
        const limit = parseInt(req.params.limit);
        const after = decode(req.params.after);
        // @todo check lt validity (exist?); otherwise, trigger an error (404?)
        // cause during dev all "lt" are responding 200, even random values
        // but in production, it's not the case as only known values are
        // generated as endpoints
        const sort = req.params.sort;
        const reverse = req.params.order === "desc";
        const [list, previousList] = await Promise.all([
          db.getList(
            req.params.path,
            {
              limit: limit + 1,
              gte: after,
              sort,
              reverse
            },
            req.params.filter,
            req.params.value
          ),
          db.getList(
            req.params.path,
            {
              limit: limit + 1,
              gt: after,
              sort,
              reverse: !reverse
            },
            req.params.filter,
            req.params.value
          )
        ]);
        res.json(connect(list, limit, previousList));
      } catch (error) {
        log.error(error.message);
        debug(error);
        res.status(404).end();
      }
    }
  );

  apiServer.get(rootPath + "/:path/item/*?.json", async function(
    req: express$Request,
    res: express$Response
  ) {
    debug(req.url, JSON.stringify(req.params));
    try {
      // thing/item/.json means you want /item/thing.json
      // (because thing/index.md => thing)
      if (!req.params["0"]) {
        const resource = await db.get(null, req.params.path);
        res.json(resource.value);
      } else {
        const resource = await db.get(req.params.path, req.params["0"]);
        res.json(resource.value);
      }
    } catch (error) {
      log.error(error.message);
      debug(error);
      res.status(404).end();
    }
  });

  apiServer.get(
    rootPath + "/by-:filter/:value/:order/:sort.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params));
      try {
        const sort = req.params.sort;
        const reverse = req.params.order === "desc";
        const list = await db.getList(
          null,
          {
            sort,
            reverse
          },
          req.params.filter,
          req.params.value
        );
        res.json(connect(list));
      } catch (error) {
        log.error(error.message);
        debug(error);
        res.status(404).end();
      }
    }
  );

  apiServer.get(
    rootPath + "/by-:filter/:value/:order/:sort/limit-:limit.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params));
      try {
        const limit = parseInt(req.params.limit);
        const sort = req.params.sort;
        const reverse = req.params.order === "desc";
        const list = await db.getList(
          null,
          {
            limit: limit + 1,
            sort,
            reverse
          },
          req.params.filter,
          req.params.value
        );
        res.json(connect(list, limit));
      } catch (error) {
        log.error(error.message);
        debug(error);
        res.status(404).end();
      }
    }
  );

  apiServer.get(
    rootPath + "/by-:filter/:value/:order/:sort/limit-:limit/after-:after.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params));
      try {
        const limit = parseInt(req.params.limit);
        const after = decode(req.params.after);
        // @todo check lt validity (exist?); otherwise, trigger an error (404?)
        // cause during dev all "lt" are responding 200, even random values
        // but in production, it's not the case as only known values are
        // generated as endpoints
        const sort = req.params.sort;
        const reverse = req.params.order === "desc";
        const [list, previousList] = await Promise.all([
          db.getList(
            null,
            {
              limit: limit + 1,
              gte: after,
              sort,
              reverse
            },
            req.params.filter,
            req.params.value
          ),
          db.getList(
            null,
            {
              limit: limit + 1,
              gt: after,
              sort,
              reverse: !reverse
            },
            req.params.filter,
            req.params.value
          )
        ]);
        res.json(connect(list, limit, previousList));
      } catch (error) {
        log.error(error.message);
        debug(error);
        res.status(404).end();
      }
    }
  );

  apiServer.get(rootPath + "/item/*?.json", async function(
    req: express$Request,
    res: express$Response
  ) {
    debug(req.url, JSON.stringify(req.params));
    // /item/.json means you want /item/index.json
    // (because thing/index.md => thing)
    const id = req.params["0"] || "index";
    try {
      const resource = await db.get(null, id);
      res.json(resource.value);
    } catch (error) {
      log.error(error.message);
      debug(error);
      res.status(404).end();
    }
  });

  // Install the plugins
  plugins.forEach(plugin => {
    if (typeof plugin.extendAPI === "function") {
      debug(`installing plugin '${plugin.name}'`);
      if (typeof plugin.extendAPI === "function") {
        plugin.extendAPI({ apiServer, db });
      }
    } else {
      debug(`plugin '${plugin.name}' have no API definition`);
    }
  });

  return apiServer;
}

export default createAPIServer;
