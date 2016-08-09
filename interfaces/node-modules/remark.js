declare module "remark" {
  declare interface remarkInstance {
    use: (plugin: Function) => remarkInstance,
    process: (s: string) => remarkResult,
  }
  declare interface remarkResult {
    toString: () => string,
  }
  declare class remark {
    (): remarkInstance
  }
  declare var exports: remark
}
