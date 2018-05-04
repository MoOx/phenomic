---
priority: 4
title: Writing plugins
---

@todo Intro to core APIs + link to some actual examples (our codebase)

## Plugins methods

# (for each method)

## When to use it?

## Arguments

## Examples

Link to our codebase to our plugins

@todo translate this types as doc

```js
declare type PhenomicPlugin = {|
  name: string,
  // transformer
  supportedFileTypes?: $ReadOnlyArray<string>,
  transform?: ({|
    file: PhenomicContentFile,
    contents: Buffer
  |}) => PhenomicTransformResult | Promise<PhenomicTransformResult>,
  // api
  extendAPI?: ({|
    apiServer: express$Application,
    db: PhenomicDB
  |}) => mixed,
  // collector
  collectFile?: ({|
    db: PhenomicDB,
    fileName: string,
    parsed: Object
  |}) => $ReadOnlyArray<mixed> | Promise<$ReadOnlyArray<mixed>>,
  // bunder
  buildForPrerendering?: () => Promise<PhenomicAppType>,
  build?: () => PhenomicAssets,
  // renderer
  getRoutes?: PhenomicAppType => void,
  // urls-resolver
  resolveURLs?: ({|
    routes: any
  |}) => Promise<$ReadOnlyArray<string>>,
  renderStatic?: ({|
    app: PhenomicAppType,
    assets: PhenomicAssets,
    location: string
  |}) => Promise<$ReadOnlyArray<{| path: string, contents: string |}>>,
  renderDevServer?: ({|
    assets: PhenomicAssets,
    location: string
  |}) => string,
  // common
  addDevServerMiddlewares?: () =>
    | $ReadOnlyArray<express$Middleware>
    | Promise<$ReadOnlyArray<express$Middleware>>,
  beforeBuild?: () => void | Promise<void>,
  afterBuild?: () => void | Promise<void>
|};
```
