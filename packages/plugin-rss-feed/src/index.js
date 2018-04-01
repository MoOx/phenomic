// @flow

import url from "url";

import fetchRestApi from "@phenomic/api-client/lib/fetch";
import query from "@phenomic/api-client/lib/query";
import logger from "@phenomic/core/lib/logger";
import express from "express";
import RSS from "rss";

const pluginName = "@phenomic/plugin-rss-feed";
const log = logger(pluginName);
const debug = require("debug")("phenomic:plugin:rss-feed");

export type options = {|
  feeds: {
    [feedUrl: string]: {|
      // https://www.npmjs.com/package/rss#feedoptions
      feedOptions: Object,
      query: PhenomicQueryConfig,
      map?: ((phenomicItem: Object) => Object) | { [key: string]: string }
    |}
  }
|};

const makeItemFromObject = (item, map) =>
  // $FlowFixMe waaat?
  Object.keys(map).reduce((acc, key) => {
    acc[key] = item[map[key]];
    return acc;
  }, {});

const defaultMap = {
  title: "title",
  url: "id",
  date: "date",
  // @todo
  // description: "excerpt",
  // optional, we assume this are good defaults
  author: "author",
  categories: "tags"
};

const defaultOptions = {
  feeds: {
    "feed.xml": {
      feedOptions: {},
      query: { path: "posts", limit: 20 }
    }
  }
};

const makeFeed = async (ROOT, feedUrl, feedConfig): Promise<string> => {
  const rss = new RSS({
    feed_url: ROOT + feedUrl,
    site_url: ROOT,
    generator: "Phenomic",
    ...feedConfig.feedOptions
  });
  const items = await fetchRestApi(query(feedConfig.query));
  items.list.forEach(item => {
    // special trick for rss feeds :)
    item.id =
      ROOT +
      (feedConfig.query.path ? feedConfig.query.path + "/" : "") +
      item.id +
      "/";
    const mappedItem =
      typeof feedConfig.map === "function"
        ? feedConfig.map(item)
        : makeItemFromObject(item, feedConfig.map || defaultMap);
    debug("item", item, mappedItem);
    rss.item(mappedItem);
  });
  return rss.xml(
    process.env.PHENOMIC_ENV === "development" ? { indent: true } : {}
  );
};

const getFeedKeys = options => {
  const keys = Object.keys(options.feeds);
  if (!keys.length) {
    log.warn(
      `No 'feeds' founds in options. Please add entries.\n Current options:\n ${JSON.stringify(
        options,
        null,
        2
      )}).`
    );
  }
  return keys;
};

const getRoot = (config: PhenomicConfig) =>
  url.format(config.baseUrl).slice(0, -1) +
  (process.env.PHENOMIC_ENV === "development" ? `:${config.port}/` : "/");

const rssFeed: PhenomicPluginModule<options> = (
  config: PhenomicConfig,
  options: options = defaultOptions
) => {
  return {
    name: pluginName,
    addDevServerMiddlewares() {
      const router = express.Router();
      getFeedKeys(options).forEach(feedUrl => {
        router.get("/" + feedUrl, async (req, res: express$Response) => {
          debug(req.url);
          const output = await makeFeed(
            getRoot(config),
            feedUrl,
            options.feeds[feedUrl]
          );
          res.type("xml").send(output);
        });
      });
      return [router];
    },
    resolveURLs() {
      return Promise.resolve(getFeedKeys(options));
    },
    async renderStatic({ location }: { location: string }) {
      return [
        {
          path: location,
          contents: await makeFeed(
            getRoot(config),
            location,
            options.feeds[location]
          )
        }
      ];
    }
  };
};

export default rssFeed;
