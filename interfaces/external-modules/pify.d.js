declare module "pify" {
  declare class PromisifyFunction {
    (...args: any): Promise
  }
  declare class Pify {
    (callback: Function): PromisifyFunction
  }
  declare var exports: Pify
}
