---
title: How to use generate feeds in Statinamic
incomplete: true
---

The `statinamic/lib/md-collection-loader` can handle this very easily.
The default boilerplate already handles a default RSS feed that will grab the
last 20 posts.

Here is a commented part of the webpack configuration that will helps:

```js
  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: "statinamic/lib/md-collection-loader" +
        `?${ JSON.stringify({
          context: source,
          basepath: config.baseUrl.pathname,

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
        }) }`,
      },
```
