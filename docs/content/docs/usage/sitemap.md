---
title: How to generate a sitemap with Phenomic
---

Phenomic allows you to generate a sitemap very easily if you use the ``phenomicLoader``.

The phenomic-theme-base already handles a default XML sitemap that will grab all your urls.

Here is a commented part of the webpack configuration that will help:

```js
import pkg from "./package.json"
import { phenomicLoader } from "phenomic"
import PhenomicLoaderSitemapWebpackPlugin
  from "phenomic/lib/loader-sitemap-webpack-plugin"

// ...

  module: {
    // webpack 1
    loaders: [
    // webpack 2
    // rules: [
      {
        test: /\.(md|markdown)$/,
        loader: phenomicLoader,
        query: {
          context: path.join(config.cwd, config.source),
        },

        // ...
      }
    ],
  },
  plugins: [
    new PhenomicLoaderSitemapWebpackPlugin({
      // This param is mandatory. You must specify your site url.
      // Here we take the url we specified in the `package.json`
      site_url: pkg.homepage,
      // this special key allows to filter the collection
      collectionOptions: {
        // For example you can add a front-matter metadata to your `.md` files
        // We display all urls in sitemap except if front-matter `isInSitemap: false` is defined
        filter: (c) => typeof(c.isInSitemap) === "undefined" || c.isInSitemap === true,
        sort: "__url",
      },
    }),
    // ...
  ],
  // ...
```
