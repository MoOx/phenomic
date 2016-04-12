---
title: How to use configure Phenomic
---

The simplest and easiest way to configure Phenomic is by updating
the ``package.json`` where you can tweak some built-in features.

Here is a commented ``package.json`` with only the interesting parts
(with default values).

```js
{
  // tell npm that there are a lot of fields that you don't need
  // and prevent publishing this folder as a npm package
  "private": true,

  // npm needs a 'dashed-name' (optional?)
  "name": "YOUR-NAME-that-might-be-used-in-some-title-tags",

  // statinamic uses the default package.json homepage
  // ** it's a required field to adjust url for production build **
  "homepage": "http://YOUR.HOSTNAME/your-base-url-if-needed/",

  // here is the script part, which the ones related to Phenomic
  // you can add more like linting and stuff like that :)
  "scripts": {
    "start": "statinamic start",
    "build": "statinamic build",
  },
  // Note that you can provide some flags but for now they are not documented
  // (start and build should be enough)
  //
  // Here are some default environnement variable set by "statinamic" bin
  // BABEL_DISABLE_CACHE=1
  //  (required to run webpack loaders correctly in Node
  // DEBUG=statinamic:*
  //  (to get some visual feedback during development and build)

  // Phenomic core section (default values)
  "statinamic": {
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

    // .nojekyll file to avoid GitHub wasting time to run his default engine
    //   (and at the same time, allow filename prefixed by an `_`)
    "nojekyll": true,

    // host for development
    "devHost": "0.0.0.0",

    // port for development
    "devPort": "3000",

    // flag to add information during development
    "verbose": false,

    //  open a new tab when the dev server starts
    "open": true,

    // generate appcache manifest for offline access
    // See docs/advanced/offline-browsing for more information
    "appcache": true
  },

  // That's because es5 is not enough
  "babel": {
    "presets": [
      "react",
      "es2015",
      "stage-1"
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

## Notes

- You can use the ``package.json`` file to store most of your configuration,
  such as trackers for example; Google Analytics, Disqus and so on.
- You can override every option as a cli flag/option (eg: ``--dev-port=4000``).

## Advanced configuration

The parts that you can tweak in ``package.json`` are just the tip of the iceberg.
There is a lot you can do depending on your use case.

If you want to change stuff like CSS or JS preprocessors or linters, you might
want to edit the _webpack configurations_.

The default boilerplate stores 2 configurations:

- ``scripts/webpack.config.babel.js`` used for the Universal code,
- ``scripts/webpack.config.client.js`` used *only* for the client code.

You can open those 2 files and tweak the parts you need or add some missing
pieces.

_Be sure to check out the [webpack documentation](http://webpack.github.io/docs/)._

**We might add some common changes you would like to make here. Feel free to
open issues if you don't know how to make some changes.**
