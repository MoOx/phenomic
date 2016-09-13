---
title: How to use generate feeds in Phenomic
incomplete: true
---

The ``phenomicLoader`` allows you to generate RSS feeds very easily.

The phenomic-theme-base already handles a default RSS feed that will grab the
last 20 posts.

Here is a commented part of the webpack configuration that will help:

```js
import pkg from "./package.json"
import { phenomicLoader } from "phenomic"
import PhenomicLoaderFeedWebpackPlugin
  from "phenomic/lib/loader-feed-webpack-plugin"

// ...

  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: phenomicLoader,
        query: {
          context: path.join(config.cwd, config.source),
        },

        // ...
      }
    ],
  },
  plugins: [
    new PhenomicLoaderFeedWebpackPlugin({
      // here you define generic metadata for your feed
      feedsOptions: {
        title: pkg.name,
        site_url: pkg.homepage,
      },
      feeds: {
        // here we define one feed, but you can generate multiple, based
        // on different filters
        "feed.xml": {
          collectionOptions: {
            filter: { layout: "Post" },
            sort: "date",
            reverse: true,
            limit: 20,
          },
        },
      },
    }),
  }
  // ...
```
