---
title: How to configure Phenomic build step with Webpack?
---

If you want to change stuff like CSS or JS preprocessors or linters, you might
want to edit the _webpack configuration_ (``webpack.config.babel.js``).

_Be sure to check out the
[webpack documentation](http://webpack.github.io/docs/)._

⚠️ Keep in mind that Phenomic will add some pieces to the final webpack
configuration to fit its requirements, but changes should not affect you.

### ``phenomicLoader``

One particular piece of the webpack configuration is important for Phenomic.
The section that defines the loader for ``.md`` files (or whatever you use)
is crucial (in the phenomic-theme-base, it's the first loader) :

- it allows you to control what text engine to use
  (default to Markdown using [remark](http://remark.js.org/)
  using a solid [default](https://github.com/MoOx/phenomic/blob/master/src/phenomic-loader-plugin-markdown-transform-body-property-to-html/index.js))
  and will generate JSON files, that will be consumed for the front-end,
- it handles the generation of the collection data,
- it allows you to generate some RSS feeds.

There are two ways to send options to ``phenomicLoader``:

- use webpack loader ``query`` option (_not recommended_, see below)
- use a ``phenomic`` section in webpack configuration.

**The last method is recommended because ``query`` cannot contains (and ignores
without warnings) things that are not JSON (eg: functions).**
And to use plugins (eg: custom renderer), you might need to use a function.

Here is a commented part of a webpack configuration that use all options

```js
//...

import pkg from "./package.json"
import { phenomicLoader, phenomicLoaderPlugins } from "phenomic"

export const makeConfig = (config = {}) => {
  return {
    // ...
    module: {
      loaders: [
        {
          test: /\.md$/,
          loader: phenomicLoader,

          // you can also define options here, but functions will be silently
          // ignored because how webpack works
          // query: {
          //   ...
          // }
        },
        // ...
      ],
    },

    phenomic: {
      // the context where to read .md to
      context: path.join(__dirname, config.source),

      // below are the default values,
      // you don't need those by default
      plugins: [
        phenomicLoaderPlugins.initHeadPropertyFromConfig,
        phenomicLoaderPlugins.initHeadPropertyFromContent,
        phenomicLoaderPlugins.initBodyPropertyFromContent,
        phenomicLoaderPlugins.markdownInitHeadDescriptionPropertyFromContent,
        phenomicLoaderPlugins.markdownTransformBodyPropertyToHtml,
        // here you can add/replace any function you want
        // for examples, see
        // https://github.com/MoOx/phenomic/blob/master/src/
        // eg: if you need the raw file content in your pages,
        // you can add the following plugin that will add a `raw` property
        // phenomicLoaderPlugins.addRawProperty,
        // if you want raw body (text content without the front-matter)
        // you can add the following plugin that will add a `rawBody` property
        // phenomicLoaderPlugins.addRawBodyProperty,
      ]

      // default values for `head`
      // this value can be defined and used by the plugin
      // initHeadPropertyFromConfig
      defaultHead: {
        layout: "Post",
        comments: true,
      }

      // RSS global options
      feedsOptions: {
        title: pkg.name,
        site_url: pkg.homepage,
      },

      feeds: {
        // RSS
        "feed.xml": {
          collectionOptions: {
            // here, you can filter using
            // phenomic/lib/enhance-collection API
            // see /docs/usage/collections/
            filter: { layout: "Post" },
            sort: "date",
            reverse: true,
            limit: 20,
          },
        },
      },
    },
    // ...
  }
}
```
