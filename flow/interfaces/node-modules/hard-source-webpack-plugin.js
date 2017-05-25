type HardSourceWebpackPluginConfig = {
  cacheDirectory: string,
  environmentPaths: {
    root: string,
    directories?: Array<string>,
    files?: Array<string>
  }
};

declare module "hard-source-webpack-plugin" {
  declare function exports(config: HardSourceWebpackPluginConfig): any;
}
