type NodeObjectHashConfig = {
  coerce?: string,
  sort?: boolean,
  alg?: string,
  enc?: string,
};

declare function hash(obj: Object): string;

type NodeObjectHashInstance = {
  hash: hash,
};

declare module "node-object-hash" {
  declare module.exports: (
    config?: NodeObjectHashConfig,
  ) => NodeObjectHashInstance;
}
