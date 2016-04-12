declare function cwd(): string;

declare var process: {
  env: {
    NODE_ENV? : "production",
    STATINAMIC_PATHNAME: string,
  },
  cwd: cwd,
  agrv: Array<string>,
}

declare var window: {
  __COLLECTION__: PhenomicCollection,
  location: Object,
}
