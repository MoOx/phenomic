---
priority: 3
title: Configuration
subtitle: How to configure Phenomic
---

Phenomic needs a configuration in order to start. The minimum to give is what
plugins or presets you need. A minimal example configuration could be like this

```json
{
  "presets": ["@phenomic/preset-react-app"]
}
```

## Configuration source

We use [comsmiconfig](https://github.com/davidtheclark/cosmiconfig) to load the
configuration, so it's up to you to use the format and file you want. Here are
some example with the previous configure

### `package.json`

```json
{
  "...": "...",
  "phenomic": {
    "presets": ["@phenomic/preset-react-app"]
  }
}
```

### `.phenomicrc(.json)`

```json
{
  "presets": ["@phenomic/preset-react-app"]
}
```

Note that yaml is also supported in .rc files.

### `phenomic.config.js`

```js
module.exports = {
  presets: ["@phenomic/preset-react-app"]
};
```

Note that we recommend you to start with `package.json` for simplicity and avoid
the .rc hell, but that's up to you. Some advanced options accept JavaScript, so
in some case, you might end up with a `phenomic.config.js`.

## Options

To make this simple, here is a gigantic commented configuration. Everything is
optional except having at least a few `plugins` or a `preset`

```js
module.exports = {
  // root of your website
  // this is especially handy if your website is not at a root domain
  // In this case, development will reflect the base path.
  baseUrl: "http//root.of/your/website", // here development will start on http//localhost:3333/your/website

  // root of the project
  path: process.cwd(),

  // content to read from the filesystem that will be injected in content api
  content: {
    // load everything into content/**/*
    // key is used as the root for future queries
    content: ["**/*"],
    // load everything in ../packages/(package.json|*/docs/**/*.md)
    // note here that the root is enforced. We don't want
    // to use ../ in our queries later
    // Queries will have to use packages/*** instead of ../packages
    packages: {
      root: "../packages",
      globs: ["package.json", "*/docs/**/*.md"]
    }
    // Note that we could have used a different word and a more complex path
    // (eg: `pkgs: { root: "../../path/to/packages/"`)
  },

  // location of the static website output
  // note that it will be generated in the `path` folder
  outdir: "dist", // will be process.cwd()/dist according to our path option

  // development server port
  port: "3333",

  // development socket port (used for hot loading on data )
  socketPort: "3334",

  // prefix for javascript/css bundles used by plugin-bundler-*
  bundleName: "phenomic",

  // plugins and presets accept various form (array/objects)
  // we will show you some mix below

  // array of string means that this are node_modules names
  plugins: [
    "@phenomic/plugin-bundler-webpack",
    "@phenomic/plugin-renderer-react",
    "@phenomic/plugin-transform-markdown"[
      // you can also includes array[name, option]
      ("@phenomic/plugin-rss-feed",
      {
        feeds: {
          "feed.xml": {
            feedOptions: {
              title: "Phenomic.io",
              description: "Phenomic news"
            },
            query: {
              path: "content/blog",
              limit: 20
            }
          }
        }
      })
    ]
  ],

  // array of string means that this are node_modules names
  presets: [
    "@phenomic/preset-react-app"

    // here we could also accept options
    // @todo
  ]
};
```
