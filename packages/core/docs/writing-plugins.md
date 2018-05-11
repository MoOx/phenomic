---
priority: 4
title: Writing plugins
---

Plugins are the strength of Phenomic and what make it so flexible and reusable.
Phenomic allows you to interact with it at several state of the process
depending on what you need.

## Passing a plugin

To tell Phenomic to use a given plugin, you need to pass it via
[the configuration `plugins` option](./configuration.md#plugins).

A plugin can take the form of a node_modules or directly a function in the
configuration. It must be a function that returns object.

```js
module.exports = (/* options */) => {
  return {
    // plugin
    name: "phenomic-plugin-name",

    // fake method name
    method1: () => {},
    method2: () => {}
  };
};
```

Note that you can also export using ES2015 export

```js
const yourPlugin = (/* options */) => {
  return {
    // plugin
    // ...
  };
};

export default yourPlugin;
```

If your plugin accepts options, you can use the first parameter of the function.
This parameter will receive the option that you can inject via
[the configuration `plugins` option](./configuration.md#plugins).

## Examples

The best source of examples will be phenomic
[plugins included in our repository](https://github.com/phenomic/phenomic/tree/master/packages).

Plugins interesting part are usually located at
`phenomic/packages/plugin-*/src/index.js`.

## Plugins methods

### `supportedFileTypes` + `transform`

The method `transform` is useful if you plan to use [Content API](./api.md). It
allows you to transform files (that match `supportedFileTypes` - array of files
extensions) as something ready for Phenomic database.

#### `supportedFileTypes`

Array of files extensions.

Example

```js
supportedFileTypes: ["md", "markdown"]; // will match *.md and *.markdown
```

Used in

* https://github.com/phenomic/phenomic/tree/master/packages/plugin-transform-markdown/src/index.js
* https://github.com/phenomic/phenomic/tree/master/packages/plugin-transform-asciidoc/src/index.js
* https://github.com/phenomic/phenomic/tree/master/packages/plugin-transform-json/src/index.js

#### `transform`

Function that accepts an object and must return an result ready for Phenomic
database:

```js
function transform({
  // you will only receive file that match `supportedFileTypes`
  file: { name: string, fullpath: string },
  contents: Buffer
}) {
  // do your thing to parse `contents`
  // ...

  // then return a database entry
  return {
    data: Object,
    partial: Object
  };
}
```

Learn more about database entries in [Content API documentation](./api.md).

Used in

* https://github.com/phenomic/phenomic/tree/master/packages/plugin-transform-markdown/src/index.js
* https://github.com/phenomic/phenomic/tree/master/packages/plugin-transform-asciidoc/src/index.js
* https://github.com/phenomic/phenomic/tree/master/packages/plugin-transform-json/src/index.js

### `extendAPI`

```js
  extendAPI?: ({
    apiServer: express$Application,
    db: PhenomicDB
  }) => mixed,
```

### `buildForPrerendering`

```js
  buildForPrerendering?: () => Promise<PhenomicAppType>,
```

### `build`

```js
  build?: () => PhenomicAssets,
```

### `getRoutes`

```js
getRoutes?: PhenomicAppType => void,
```

### `resolveURLs`

```js
  resolveURLs?: ({|
    routes: any
  |}) => Promise<$ReadOnlyArray<string>>,
```

### `renderStatic`

```js
  renderStatic?: ({|
    app: PhenomicAppType,
    assets: PhenomicAssets,
    location: string
  |}) => Promise<$ReadOnlyArray<{| path: string, contents: string |}>>,
```

### `renderDevServer`

```js
  renderDevServer?: ({|
    assets: PhenomicAssets,
    location: string
  |}) => string,
```

### `addDevServerMiddlewares`

```js
  // common
  addDevServerMiddlewares?: () =>
    | $ReadOnlyArray<express$Middleware>
    | Promise<$ReadOnlyArray<express$Middleware>>,
```

### `beforeBuild`

```js
  beforeBuild?: () => void | Promise<void>,
```

### `afterBuild`

```js
  afterBuild?: () => void | Promise<void>
```
