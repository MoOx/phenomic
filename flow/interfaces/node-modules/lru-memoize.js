declare module "lru-memoize" {
  declare function memoizeInstance(func: Function): Function
  declare function memoize(num: number): memoizeInstance
  declare var exports: memoize
}
