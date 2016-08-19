declare module "chalk" {
  declare class chalkFunction {
    (log: string): string
  }
  declare interface chalk {
    green: chalkFunction,
    yellow: chalkFunction,
    red: chalkFunction,
  }
  declare var exports: chalk
}
