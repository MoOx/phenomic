---
title: How to use configure Statinamic
---

The simplest way to configure Statinamic is by using your ``package.json`` to
store your preferences.

Here is a commented ``package.json`` with only the interesting parts.

```js
{
  // tell npm that there is a lot of field that you don't need
  // and prevent publishing this folder as a npm package
  "private": true,

  // npm need a 'dashed-name' (optional?)
  "name": "YOUR-NAME-that-might-be-used-in-some-title-tags",

  // statinamic use the default package.json homepage
  // ** it's a required field to adjust url for production build **
  "homepage": "http://YOUR.HOSTNAME/your-base-url-if-needed/",

  // here is the script part, which the ones related to Statinamic
  // you can add more like linting and stuff like that :)
  // BABEL_ENV is vital and helps run components code universally
  // DEBUG=statinamic:* is optional (and mainly for development)
  "scripts": {
    "start": "cross-env BABEL_ENV=statinamic DEBUG=statinamic:* babel-node scripts/build --server --open --dev",
    "build": "cross-env BABEL_ENV=statinamic DEBUG=statinamic:* babel-node scripts/build --static --production"
  },

  // Statinamic core section (default values)
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
    "assets": "assets",

    // CNAME file generated from `homepage` hostname in the destination folder
    // use `true` to enable
    "CNAME": false,

    // .nojekyll file to avoid GitHub wasting time to run his default engine
    //   (and at the same time, allow filename prefixed by an `_`)
    "nojekyll": true,

    // host for development
    devHost: "0.0.0.0",

    // port for development
    devPort: "3000",

    // flag to add information during development
    verbose: false,
  },

  // That's because es5 is not enough
  "babel": {
    "presets": [
      "react",
      "es2015",
      "stage-1"
    ],
    "env": {
      // this section is very important and must be (for now) defined here
      "statinamic": {
        "plugins": [
          [
            "babel-plugin-webpack-loaders",
            {
              "config": "./scripts/webpack.config.babel.js",
              "verbose": false
            }
          ]
        ]
      }
    }
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

- You can use the ``package.json`` file to store most static data you want to like
  some tracker id (eg: Google Analytics, Disqus...).
- You can override every option as a cli flag/option (eg: ``--dev-port=4000``).
