declare module "webpack-hot-middleware" {
  declare module.exports: (
    compiler: Object,
    options: Object,
  ) => express$Middleware;
}
