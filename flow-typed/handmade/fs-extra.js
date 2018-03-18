declare module "fs-extra" {
  declare interface fsExtra {
    emptyDirSync: (from: string, to: string) => void;
    copySync: (from: string, to: string) => void;
    copy: (from: string, to: string, callback: (err: Error) => void) => void;
  }
  declare module.exports: fsExtra;
}
