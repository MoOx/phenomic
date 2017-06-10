declare module "remark" {
  declare interface remarkInstance {
    use: (plugin: Function, options?: Object) => remarkInstance,
    process: (s: string, options?: Object) => remarkResult,
    processSync: (s: string, options?: Object) => Object
  }
  declare interface remarkResult {
    toString: () => string
  }
  declare class remark {
    (): remarkInstance
  }
  declare var exports: remark;
}
