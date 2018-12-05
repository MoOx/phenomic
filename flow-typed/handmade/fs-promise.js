declare module "fs-promise" {
  declare function writeFile(to: string, content: string): Promise<any>;
  declare function mkdirs(path: string): Promise<any>;

  declare interface fsPromise {
    writeFile: typeof writeFile;
    mkdirs: typeof mkdirs;
  }
  declare module.exports: fsPromise;
}
