declare module "globby" {
  declare type async =
    (pattern: Array<string>, options: Object) => Promise<Array<string>>
  declare var exports: {
    (): async,
    sync: (pattern: Array<string>, options: Object) => Array<string>
  }
}
