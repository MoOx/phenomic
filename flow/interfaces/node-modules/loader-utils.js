declare module "loader-utils" {
  declare interface LoaderUtils {
    parseQuery: Function;
    getHashDigest: Function;
  }
  declare var exports: LoaderUtils;
}
