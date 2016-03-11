declare module "fs-promise" {
  declare function writeFile(to: string, content: string): Promise;
  declare function mkdirs(path: string): Promise;

  declare interface fsPromise {
    writeFile: writeFile,
    mkdirs: mkdirs,
  }
  declare var exports: fsPromise;
}
