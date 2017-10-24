declare module "simple-json-fetch" {
  declare class SimpleJsonFetch {
    (uri: string): Promise<any>;
  }
  declare var exports: SimpleJsonFetch;
}
