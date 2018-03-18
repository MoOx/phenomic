declare module "fs-promise" {
  declare function writeFile(to: string, content: string): Promise<any>;
  declare function mkdirs(path: string): Promise<any>;

  declare interface fsPromise {
    writeFile: writeFile;
    mkdirs: mkdirs;
  }
  declare module.exports: fsPromise;
}
