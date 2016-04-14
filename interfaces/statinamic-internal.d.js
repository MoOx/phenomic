/* eslint-disable no-unused-vars */

type PromiseAction = {
  types: Array<string>,
  page: string,
  promise: Promise,
}

type PhenomicCollection = Array<Object>

type PhenomicAssetsConfig = {
  route: string,
  path: string,
}

type PhenomicAppcacheConfig = Array<string> | false

// Configs generated from configurator
type PhenomicConfig = {
  cwd: string,
  source: string,
  destination: string,
  assets: PhenomicAssetsConfig, // no string type
  appcache: PhenomicAppcacheConfig, // no string type
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
}
