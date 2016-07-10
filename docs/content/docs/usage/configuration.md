---
title: How to use configure Phenomic
---

You have multiple things you can tweak to adjust Phenomic behavior to your
needs.

- [Phenomic configuration](#phenomic) for built-in features
- [Webpack configuration](#webpack) to adjust behavior of consumed files
  (CSS, JS, MD...)
- [``react-helmet``](#react-helmet) to handle HTML head/meta of pages

## Phenomic

The ``package.json`` is currently the place where you can tweak
Phenomic built-in features.

You can use the ``package.json`` to store most of your configuration,
such as trackers for example; Google Analytics, Disqus and so on.

_Note: You can override almost every option as a CLI flag/option
(eg: ``--devPort=4000``)._

Here is a commented ``package.json`` with only the interesting parts
(with default values).

```js
{
  // tell npm that there are a lot of fields that you don't need
  // and prevent publishing this folder as a npm package
  "private": true,

  // npm needs a 'dashed-name' (optional?)
  "name": "YOUR-NAME-that-might-be-used-in-some-title-tags",

  // phenomic uses the default package.json homepage
  // ** it's a required field to adjust url for production build **
  "homepage": "http://YOUR.HOSTNAME/your-base-url-if-needed/",

  // here is the script part, which the ones related to Phenomic
  // you can add more like linting and stuff like that :)
  "scripts": {
    "start": "phenomic start",
    "build": "phenomic build",
  },
  // Note that you can provide some flags but for now they are not documented
  // (start and build should be enough)
  //
  // Here are some default environnement variable set by "phenomic" bin
  // DEBUG=phenomic:*
  //  (to get some visual feedback during development and build)

  // Phenomic core section (default values)
  "phenomic": {
    // current working directory
    // you should not need to specify this, but who knows what you will do with
    // it :D
    "cwd": process.cwd(),

    // Where your markdown files are
    "source": "content",

    // Where to put the build files
    "destination": "dist",

    // where you have your static assets
    // you have multiple ways to configure this field:
    // - simple string (relative to source folder)
    // - object with path (local path, relative to source) and route in web
    // - a boolean to disable
    "assets": "assets",

    // CNAME file generated from `homepage` hostname in the destination folder
    // use `true` to enable
    "CNAME": false,

    // .nojekyll file to avoid GitHub Pages wasting time to run its default engine
    // (and also allow filename prefixed with a `_`)
    // see: https://github.com/blog/572-bypassing-jekyll-on-github-pages
    "nojekyll": true,

    // host for development
    "devHost": "0.0.0.0",

    // port for development
    "devPort": 3333,

    // flag to add information during development
    "verbose": false,

    //  open a new tab when the dev server starts
    "open": true,

    // generate offline requirements (service worker / appcache)
    // See docs/advanced/offline-browsing for more information
    "offline": true
  },

  // That's because es5 is not enough
  "babel": {
    "presets": [
      "babel-preset-react",
      "babel-preset-es2015",
      "babel-preset-stage-1"
    ],
  },

  // linting prevent errors
  // See 'Good practices' section.
  "eslintConfig": {
    // ...
  },
  "stylelint": {
    // ...
  }
}
```

## Webpack

The parts that you can tweak in ``package.json`` are just the tip of the iceberg.
There is a lot you can do depending on your use case.

If you want to change stuff like CSS or JS preprocessors or linters, you might
want to edit the _webpack configuration_ (``webpack.config.babel.js``).

_Be sure to check out the [webpack documentation](http://webpack.github.io/docs/)._

Keep in mind that Phenomic will add some pieces to the final webpack
configuration to fit its requirements.

### ``content-loader``

One particular piece of the webpack configuration is important for Phenomic.
The section that defines a loader for ``.md`` files (or any other text format)
is crucial (in the default boilerplate, it's the first loader) :

- it allows you to control what text engine to use
  (default to Markdown using [remark](http://remark.js.org/)
  using a solid [default](https://github.com/MoOx/phenomic/blob/master/src/content-loader/default-renderer.js))
- it allows you to generate some RSS feeds

There is two ways to send option to the ``content-loader``:

- use webpack loader ``query`` option (_not recommended_, see below)
- use a ``phenomic.contentLoader`` section in webpack configuration.

**The last method is recommended because ``query`` cannot contains (and ignores
without warnings) things that are not JSON (eg: functions).**
And to use a custom renderer, you might need to use a function.


Here is a commented part of a webpack configuration that use all options

```js
//...

import pkg from "./package.json"

export const makeConfig = (config = {}) => {
  return {
    // ...
    module: {
      loaders: [
        {
          test: /\.md$/,
          loader: "phenomic/lib/content-loader",

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
      contentLoader: {

        // the context where to read .md to
        context: path.join(__dirname, config.source),

        renderer: (text) => {
          // here you can use whatever engine you want,
          // you just need to return some HTML
          return html
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
    },
    // ...
  }
}
```


## React-Helmet

[React-Helmet](https://github.com/nfl/react-helmet) is the best document head
manager available for React that allows you to manage all of your definitions
and changes to your documents head with support for
_document title, meta, link, script, and base tags._
It's like ``react-document-title`` but on steroid.

The default boilerplate uses ``react-helmet`` in several places
(look for ``<Helmet`` usage).

[To know more about how to use ``react-helmet``, please read the documentation](https://github.com/nfl/react-helmet#readme)

---

**We might add some common changes you would like to make here. Feel free to
open issues if you don't know how to make some changes.**
