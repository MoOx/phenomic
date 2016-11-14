---
title: How to configure Phenomic core?
---

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

  // here is the script part, with the ones related to Phenomic
  // you can add more like linting and stuff like that :)
  "scripts": {
    "start": "phenomic start",
    "build": "phenomic build",
  },
  // Note that you can provide some flags but for now they are not documented
  // (start and build should be enough)
  //
  // Here are some default environment variables set by "phenomic" bin
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
    "offline": false,

    // force offline mode during development, for testing
    "force-offline": false,
    // best thing is to use this value in the CLI
    // $ npm start -- --force-offline
    // or with yarn
    // $ yarn start -- --force-offline

    // EXPERIMENTAL: enable webpack hard cache via Webpack hard-source-plugin
    "cache": false,

    // disable all client scripts code
    // To turn Phenomic into a standard static website generator
    // 🙃
    "clientScripts": true,
  },

  // That's because es5 is not enough
  "babel": {
    "presets": [
      "babel-preset-react",
      "babel-preset-latest",
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
