import express from "express";

import pkg from "../../package.json";

const debug = require("debug")("phenomic:core:api");

export const encode = (text: string) => new Buffer(text).toString("base64");
export const decode = (text: string) => new Buffer(text, "base64").toString();

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
    list: list.slice(0, limit),
    // deprecated
    hasNextPage,
    hasPreviousPage
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

  server.get("/:path/by-:filter/:value/:order.json", async function(
    req: express$Request,
    res: express$Response
  ) {
    debug(req.url, JSON.stringify(req.params));
    try {
      const reverse = req.params.order === "desc";
      const list = await db.getList(
        req.params.path,
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
    "/:path/by-:filter/:value/:order/limit-:limit.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params));
      try {
        const limit = parseInt(req.params.limit);
        const reverse = req.params.order === "desc";
        const list = await db.getList(
          req.params.path,
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
    "/:path/by-:filter/:value/:order/limit-:limit/after-:after.json",
    async function(req: express$Request, res: express$Response) {
      debug(req.url, JSON.stringify(req.params));
      try {
        const limit = parseInt(req.params.limit);
        const after = decode(req.params.after);
        // @todo check lt validity (exist?); otherwise, trigger an error (404?)
        // cause during dev all "lt" are responding 200, even random values
        // but in production, it's not the case as only known values are
        // generated as endpoints
        const reverse = req.params.order === "desc";
        const [list, previousList] = await Promise.all([
          db.getList(
            req.params.path,
            {
              limit: limit + 1,
              gte: after,
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

  server.get("/:path/item/*.json", async function(
    req: express$Request,
    res: express$Response
  ) {
    debug(req.url, JSON.stringify(req.params));
    try {
      const resource = await db.get(req.params.path, req.params["0"]);
      res.json(resource.value);
    } catch (error) {
      console.error(error);
      res.status(404).end();
    }
  });

  server.get("/item/*.json", async function(
    req: express$Request,
    res: express$Response
  ) {
    debug(req.url, JSON.stringify(req.params));
    try {
      const resource = await db.get(null, req.params["0"]);
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
