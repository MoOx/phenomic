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
  presets: ["@phenomic/preset-react-app"],
};
```

Note that we recommend you to start with `package.json` for simplicity and avoid
the .rc hell, but that's up to you. Some advanced options accept JavaScript, so
in some case, you might end up with a `phenomic.config.js`.

## Options

To make this simple, here is a gigantic commented configuration. Everything is
optional except having at least a few `plugins` or a `preset`

### `baseUrl`

_(default: none)_

Root of your website. This is especially handy if your website is not at a root
domain In this case, development will reflect the base path. Example:

```js
{
  // here development will start on http//localhost:3333/your/website
  baseUrl: "http//root.of/your/website";
}
```

### `path`

_(default: `process.cwd()`)_

Root of the project. Used as root for other options like `outdir`.

### `content`

_(default: `{ content: ["**/*"] }`)_

Object that define the content to read from the filesystem that will be injected
in content api. Key is used as the root for future queries.

By default it loads everything from `{path}/content/**/*`.

You can load from any path you want

```js
{
  content: {
    posts: ["**/*"],
    portfolio: ["entries/*.md"]
  }
}
```

_Note: If you provide `key: [array of globs]`, key will be used as the root
folder when doing your query._
[More on this in content api documentation](./api.md)

If you need relative path for a root but don't want your queries to includes
awkward paths with dots, you can send instead an object
`key: { root: string, globs: [array of globs]}`.

Example:

```js
{
  content: {
    content: ["**/*"],
    someKey: {
      root: "../somewhere",
      globs: ["*/docs/**/*.md"]
    }
  }
}
```

### `outdir`

_(default: `"dist"`)_

Location of the static website output. Note that it will be generated in the
`path` folder: default value will be `{process.cwd()}/dist` according to default
path option.

### `port`

_(default: `"3333"`)_

Development server port.

### `socketPort`

_(default: `"3334"`)_

Development socket port (used for hot loading on data).

### `bundleName`

_(default: `"phenomic"`)_

Prefix for javascript/css bundles used by the
[bundlers plugins](./how-phenomic-works.md#bundler-plugins)

### `plugins`

_(default: `[]`)_

Plugins accept various form (array/objects).

```js
{
  // Array are accepted
  plugins: [
    // Accepts string (that are assumed as node_modules)
    "@phenomic/plugin-from-node_modules",

    // Accepts array [name, option]
    [
      "@phenomic/plugin-some-other-plugin",
      {
        // plugin option
        someKey: "someValue"
      }
    ],

    // Accepts function
    // See Writing plugins documentation
    () => {
      return {
        name: "plugin-name",

        // fakes names, see plugins documentation
        methodSupportedByPhenomic: () => {},
        anotherMethodSupportedByPhenomic: () => {}
      }
    }
  ],
}
```

Objects are also supported but keep in mind that keys are not used (it can be
used as comment).

```js
{
  plugins: {
    // Accepts string (that are assumed as node_modules)
    someKey: "@phenomic/plugin-from-node_modules",

    // Accepts array [name, option]
    anotherKey: [
      "@phenomic/plugin-some-other-plugin",
      {
        // plugin option
        someKey: "someValue"
      }
    ],
  }
}
```

### `presets`

_(default: none)_

Presets are a function that returns a an object with plugins (and others presets
in case you want to extend an existing preset).

Presets accept various form (array/objects).

```js
{
  // Array are accepted
  presets: [
    // Accepts string (that are assumed as node_modules)
    "@phenomic/preset-react-app",

    // Accepts array [name, {pluginKey: option}]
    [
      "@phenomic/preset-some-other-preset",
      {
        // options passed to plugin included in the preset
        [
          "pluginKey",
          {
            someKey: "someValue"
          }
        ]
      }
    ],

    // Accepts array/object mix [name, {pluginKey: option}]
    [
      "@phenomic/preset-some-other-preset",
      {
        // options passed to plugin included in the preset
        pluginKey: {
          someKey: "someValue"
        }
      }
    ],

    // Accepts function
    () => ({
      plugins: ["some-plugin", "some-other-plugins"]
      // plugins supports the array/objects like explained above
    }),

    // and array of functions/options
    [
      () => ({
        plugins: ["some-plugin", "some-other-plugins"]
        // plugins supports the array/objects like explained above
      }),
      { "some-plugins": { option: "value" } }
    ]
  ];
}
```

Objects are supported, like for plugins.

```js
{
  presets: {
    // Accepts string (that are assumed as node_modules)
    "@phenomic/preset-react-app": "@phenomic/preset-react-app",

    // see plugins for possibilities
    "phenomic-preset-something": () => ({
      plugins: ["some-plugin", "some-other-plugins"]
    })
  }
}
```

### `db`

_(default: `{}`)_

Used to send some options to the database used for content api.

#### `db.sortFunctions`

Custom sort functions used for content api.

```js
{
  db: {
    sortFunctions: {
      // keys are the way you will enable this sort
      // implementation follow Array.prototype.sort()
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      customName: (a, b) => {
        // a & b are database entries:
        // { data: Object, partial: Object }
        // You can except to have all data in the `data` key
        // (eg: looking for the title? `a.data.title`)

        // here is an approximation of the default sort function as an example
        // (not exact implementation as we have a string as a parameter,
        // which is not accessible here, since you can create as many functions
        // as you need.
        // See Content API documentation for usage

        // sort by date first
        const va = a.data.date;
        const vb = b.data.date;
        if (!va && vb) return -1;
        if (!vb && va) return 1;
        if (va && vb && vb > va) return -1;
        if (va && vb && va > vb) return 1;

        // fallbacks instead of weird order
        // sort by title
        if (b.data.title > a.data.title) return -1;
        if (a.data.title > b.data.title) return 1;

        // or sort by filename
        if (b.data.filename > a.data.filename) return -1;
        if (a.data.filename > b.data.filename) return 1;

        return 0;
      };
    }
  }
}
```
