declare module "remark" {
  declare interface remarkInstance {
    use: (plugin: Function) => remarkInstance,
    process: (s: string) => remarkResult,
    processSync: (s: string) => Object,
  }
  declare interface remarkResult {
    toString: () => string,
  }
  declare class remark {
    (): remarkInstance,
  }
  declare var exports: remark
}
