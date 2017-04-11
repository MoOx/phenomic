export type PromiseAction = {
  types: Array<string>,
  page: string,
  promise: Promise<any>,
}

export type PhenomicCollectionItem = {
  head: Object,
  body: string,
  __filename: string,
  __url: string,
  __resourceUrl: string,
  __dataUrl: string,
}

export type PhenomicCollection = Array<PhenomicCollectionItem>

export type PhenomicMinifiedCollection = Array<Object>

export type PhenomicAssetsConfig = {
  route: string,
  path: string,
}

export type PhenomicOfflineConfig = {
  serviceWorker: boolean,
  appcache: boolean,
  cachePatterns: {
    onInstall?: Array<string>,
    afterInstall?: Array<string>,
    onDemand?: Array<string>,
    excludes?: Array<string>,
  },
}

// Configs generated from configurator
export type PhenomicOldConfig = {
  cwd: string,
  source: string,
  destination: string,
  assets: boolean | PhenomicAssetsConfig, // no string type
  offline: boolean | PhenomicOfflineConfig,
  offlineConfig: PhenomicOfflineConfig,
  CNAME: boolean,
  nojekyll: boolean,
  devHost: string,
  devPort: number,
  dev: boolean,
  production: boolean,
  static: boolean,
  server: boolean,
  open: boolean,
  baseUrl: Object,
  scriptNode: string,
  scriptBrowser: string,
  clientScripts: boolean,
  webpackConfig?: WebpackConfig,
  webpackConfigBrowser?: WebpackConfig,
  webpackConfigNode?: WebpackConfig,
  cache?: boolean,
}

export type PhenomicStaticConfig = PhenomicOldConfig & {
  // private
  collection: PhenomicCollection,
  assetsFiles: WebpackAssetsFiles,
  // user
  metadata: Object,
  routes: Object,
  store: Object,
}

export type PhenomicLoaderOptions = Object

export type PhenomicLoaderPluginInput = {
  frontMatter: GrayMatterResult,
  result: PhenomicCollectionItem,
  options: PhenomicLoaderOptions,
}

export type PhenomicLoaderPlugin = (
  obj: PhenomicLoaderPluginInput
) => PhenomicCollectionItem

export type PhenomicAssetsFiles = {
  css: Array<string>,
  js: Array<string>
}
