declare module "webpack-dev-middleware" {
  declare var exports: (
    compiler: Object,
    options: Object
  ) => express$Middleware;
}
