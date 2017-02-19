---
title: How to configure Phenomic build step with Webpack?
---

If you want to change stuff like CSS or JS preprocessors or linters, you might
want to edit the _webpack configuration_ (``webpack.config.js``).

_Be sure to check out the
[webpack documentation](http://webpack.github.io/docs/)._

⚠️ Keep in mind that Phenomic will add some pieces to the final webpack
configuration to fit its requirements, but changes should not affect you.

### Webpack 1 & 2

Phenomic supports Webpack 1 & 2 and is shipped with webpack 1 by default.

[webpack documentation](http://webpack.github.io/docs/) states:

> webpack v1 is deprecated. We encourage all developers to upgrade to webpack 2.

If you want to update it is very simple:

```
npm install webpack@">=2.2.1" extract-text-webpack-plugin@">=2.0.0-beta.5" --save-dev
```

After that, edit `webpack.config.js` and follow instructions inside the file. All `// webpack 1` sections should be removed and `// webpack 2` should be uncommented.

### ``phenomicLoader``

One particular piece of the webpack configuration is important for Phenomic.
The section that defines the loader for ``.md`` files (or whatever you use)
is crucial (in the phenomic-theme-base, it's the first loader) :

- it allows you to control what text engine to use
  (default to Markdown using [remark](http://remark.js.org/)
  using a solid [default](https://github.com/MoOx/phenomic/blob/master/src/loader-plugin-markdown-transform-body-property-to-html/index.js))
  and will generate JSON files, that will be consumed for the front-end,
- it handles the generation of the collection data,
- it allows you to generate some RSS feeds.

There are two ways to send options to ``phenomicLoader``:

- use webpack loader ``query`` option (recommended for webpack 2, see below)
- use a ``phenomic`` section in webpack configuration (recommended for webpack 1).

**The last method is recommended for webpack 1 because ``query`` cannot contains
(and ignores without warnings) things that are not JSON (eg: functions).**
And to use plugins (eg: custom renderer), you might need to use a function.

That said, webpack@2 fix that problem.

Here is a commented part of a webpack configuration that use all options

```js
//...

import pkg from "./package.json"
import { phenomicLoader } from "phenomic"

export const makeConfig = (config = {}) => {
  return {
    // ...
    module: {
      loaders: [
        {
          test: /\.(md|markdown)$/,
          loader: phenomicLoader,

          // you can also define options here, but functions will be silently
          // ignored because how webpack@1 works
          // use this if you use webpack@2
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
        require("phenomic/lib/loader-plugin-init-head-property-from-config").default,
        require("phenomic/lib/loader-plugin-init-head-property-from-content").default,
        require("phenomic/lib/loader-plugin-init-body-property-from-content").default,
        require("phenomic/lib/loader-plugin-markdown-init-head.description-property-from-content").default,
        require("phenomic/lib/loader-plugin-markdown-transform-body-property-to-html").default,
        // here you can add/replace any function you want
        // for examples, see
        // https://github.com/MoOx/phenomic/blob/master/src/
        // eg: if you need the raw file content in your pages,
        // you can add the following plugin that will add a `raw` property
        // require("phenomic/lib/loader-plugin-init-raw-property-from-content").default,
        // if you want raw body (text content without the front-matter)
        // you can add the following plugin that will add a `rawBody` property
        // require("phenomic/lib/loader-plugin-init-rawBody-property-from-content").default,
      ]

      // default values for `head`
      // this value can be defined and used by the plugin
      // "phenomic/lib/loader-plugin-init-head-property-from-config"
      defaultHead: {
        layout: "Post",
        comments: true,
      }
    },
    // ...
  }
}
```
