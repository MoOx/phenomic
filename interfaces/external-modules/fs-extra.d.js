declare module "fs-extra" {
  declare function emptyDirSync(from: string, to: string): void;
  declare function copySync(from: string, to: string): void;
  declare function removeSync(target: string): void;

  declare interface fsExtra {
    emptyDirSync: emptyDirSync,
    copySync: copySync,
    removeSync: removeSync,
  }
  declare var exports: fsExtra;
}
