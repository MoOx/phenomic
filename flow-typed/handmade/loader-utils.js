declare module "loader-utils" {
  declare interface LoaderUtils {
    getOptions: Function;
    getHashDigest: Function;
  }
  declare module.exports: LoaderUtils;
}
