declare module "globby" {
  declare class globby {
    (pattern: Array<string>, options: Object): Promise<Array<string>>
  }
  declare var exports: globby;
}
