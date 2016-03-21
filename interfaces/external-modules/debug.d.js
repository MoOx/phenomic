declare module "debug" {
  declare class logger {
    (log: string): void
  }
  declare class debug {
    (loggerId: string): logger
  }
  declare var exports: debug
}
