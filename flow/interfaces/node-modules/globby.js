declare module "globby" {
  declare type pattern = string | Array<string>;
  declare type async = (
    pattern: pattern,
    options: Object
  ) => Promise<Array<string>>;
  declare var exports: {
    (): async,
    sync: (pattern: pattern, options: Object) => Array<string>
  };
}
