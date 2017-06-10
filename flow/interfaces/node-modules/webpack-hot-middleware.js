declare module "webpack-hot-middleware" {
  declare var exports: (
    compiler: Object,
    options: Object
  ) => express$Middleware;
}
