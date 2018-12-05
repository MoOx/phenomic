declare module "lru-memoize" {
  declare function memoizeInstance(func: Function): Function;
  declare function memoize(num: number): typeof memoizeInstance;
  declare module.exports: typeof memoize;
}
