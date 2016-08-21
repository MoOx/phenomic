declare module "fs-extra" {
  declare function emptyDirSync(from: string, to: string): void;
  declare function copySync(from: string, to: string): void;

  declare interface fsExtra {
    emptyDirSync: emptyDirSync,
    copySync: copySync,
  }
  declare var exports: fsExtra;
}
