import express from "express";

import pkg from "../../package.json";

const debug = require("debug")("phenomic:core:api");

const encode = text => new Buffer(text).toString("base64");
const decode = text => new Buffer(text, "base64").toString();

const connect = (list, limit, previousList = []) => {
  const hasNextPage = limit === undefined ? false : list.length >= limit;
  const hasPreviousPage = previousList.length > 0;
  return {
    hasPreviousPage,
    previousPageIsFirst: previousList.length <= limit,
    previous: hasPreviousPage && previousList[previousList.length - 2]
      ? encode(previousList[previousList.length - 2].key)
      : null,
    hasNextPage,
    next: hasNextPage && list[list.length - 1]
      ? encode(list[list.length - 1].key)
      : null,
    list: list.slice(0, limit)
  };
};

function createServer(db: PhenomicDB, plugins: PhenomicPlugins) {
  debug("creating server");
  const server = express();

  server.get("/", async function(req: express$Request, res: express$Response) {
    debug("get api version");
    res.json({
      engine: "phenomic",
      version: pkg.version
    });
  });

  server.get("/:collection/by-:filter/:value/:order.json", async function(
    req: express$Request,
    res: express$Response
  ) {
    debug(req.url, JSON.stringify(req.params));
    try {
      const reverse = req.params.order === "desc";
      const list = await db.getList(
        req.params.collection,
        { reverse },
        req.params.filter,
        req.params.value
      );
      res.json(connect(list));
    } catch (error) {
      console.error(error);
      res.status(404).end();
    }
  });

  server.get(
    "/:collection/by-:filter/:value/:order/limit-:limit.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params));
      try {
        const limit = parseInt(req.params.limit);
        const reverse = req.params.order === "desc";
        const list = await db.getList(
          req.params.collection,
          {
            limit: limit + 1,
            reverse
          },
          req.params.filter,
          req.params.value
        );
        res.json(connect(list, limit));
      } catch (error) {
        console.error(error);
        res.status(404).end();
      }
    }
  );

  server.get(
    "/:collection/by-:filter/:value/:order/limit-:limit/after-:after.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params));
      try {
        const limit = parseInt(req.params.limit);
        const lte = decode(req.params.after);
        // @todo check lt validity (exist?); otherwise, trigger an error (404?)
        // cause during dev all "lt" are responding 200, even random values
        // but in production, it's not the case as only known values are
        // generated as endpoints
        const reverse = req.params.order === "desc";
        const [list, previousList] = await Promise.all([
          db.getList(
            req.params.collection,
            {
              limit: limit + 1,
              lte,
              reverse
            },
            req.params.filter,
            req.params.value
          ),
          db.getList(
            req.params.collection,
            {
              limit: limit + 1,
              gt: lte,
              reverse: !reverse
            },
            req.params.filter,
            req.params.value
          )
        ]);
        res.json(connect(list, limit, previousList));
      } catch (error) {
        console.error(error);
        res.status(404).end();
      }
    }
  );

  server.get("/:collection/item/*.json", async function(
    req: express$Request,
    res: express$Response
  ) {
    debug(req.url, JSON.stringify(req.params));
    try {
      const resource = await db.get(req.params.collection, req.params["0"]);
      res.json(resource.value);
    } catch (error) {
      console.error(error);
      res.status(404).end();
    }
  });

  // Install the plugins
  plugins.forEach(plugin => {
    if (typeof plugin.define === "function") {
      debug(`installing plugin '${plugin.name}'`);
      // $FlowFixMe typeof above is not enough?
      plugin.define(server, db);
    } else {
      debug(`plugin '${plugin.name}' have no API definition`);
    }
  });

  return server;
}

export default createServer;
