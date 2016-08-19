/* eslint-disable no-unused-vars */
type WebpackInstance = {
  query: Object,
  options: Object,
  emitError: Function,
  emitFile: Function,
  resourcePath: string,
}

declare module "webpack" {
  declare function webpack(options: Object, callback: Function): void
  declare var exports: webpack
}
