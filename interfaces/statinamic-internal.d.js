/* eslint-disable no-unused-vars */

type PromiseAction = {
  types: Array<string>,
  page: string,
  promise: Promise,
}

type StatinamicCollection = Array<Object>

type StatinamicAssetsConfig = {
  route: string,
  path: string,
}

type StatinamicAppcacheConfig = Array<string> | false

// Configs generated from configurator
type StatinamicConfig = {
  cwd: string,
  source: string,
  destination: string,
  assets: StatinamicAssetsConfig, // no string type
  appcache: StatinamicAppcacheConfig, // no string type
  CNAME: boolean,
  nojekyll: boolean,
  devHost: string,
  devPort: string,
  dev: boolean,
  production: boolean,
  static: boolean,
  server: boolean,
  open: boolean,
  baseUrl: Object,
}
