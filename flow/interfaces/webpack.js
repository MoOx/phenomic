/* eslint-disable */

// @todo improve this
export type WebpackConfig = Object

export type WebpackAssetsFiles = { [key: string]: Array<string> }

declare module "webpack" {
  declare var exports: any;
}

declare module "extract-text-webpack-plugin" {
  declare var exports: any;
}

declare module "webpack-dev-middleware" {
  declare var exports: Function;
}
