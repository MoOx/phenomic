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
  using a solid [default](https://github.com/MoOx/phenomic/blob/master/src/loader-plugin-markdown-transform-body-property-to-html/index.js))
  and will generate JSON files, that will be consumed for the front-end,
- it handles the generation of the collection data,
- it allows you to generate some RSS feeds.

You can send options to the loader by using webpack loader ``query`` option

Here is a commented part of a webpack configuration that use all options

```js
//...

import pkg from "./package.json"
import { phenomicLoader } from "phenomic"

export default (config = {}) => {
  return {
    // ...
    module: {
      rules: [
        {
          test: /\.md$/,
          loader: phenomicLoader,
          query: {
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
          }
        },

        // ...

      ],
    },
  }
}
```
