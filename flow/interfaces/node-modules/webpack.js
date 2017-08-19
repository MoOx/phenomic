/* eslint-disable */
// @todo improve this

export type WebpackConfig = Object;

export type WebpackAssetsFiles = { [key: string]: Array<string> };

type WebpackInstance = {
  query: Object,
  options: Object,
  emitError: Function,
  emitFile: Function,
  resourcePath: string
};

declare module "webpack" {
  declare function webpack(options: Object, callback: Function): void;
  declare var exports: webpack;
}

declare var module: {
  hot: {
    accept(arg1: string | (() => void), arg2?: () => void): void
  }
};
