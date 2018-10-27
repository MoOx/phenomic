declare module "webpack-dev-middleware" {
  declare module.exports: (
    compiler: Object,
    options: Object,
  ) => express$Middleware;
}
