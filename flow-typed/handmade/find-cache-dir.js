type findCacheDirOptions = {
  name: string,
  files: Array<string>,
  cwd: string,
  create: boolean,
  thunk: boolean,
};

declare module "find-cache-dir" {
  declare function findCacheDir(options: findCacheDirOptions): string;
  declare module.exports: findCacheDir;
}
