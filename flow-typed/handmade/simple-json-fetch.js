declare module "simple-json-fetch" {
  declare class SimpleJsonFetch {
    (uri: string): Promise<any>;
  }
  declare module.exports: SimpleJsonFetch;
}
