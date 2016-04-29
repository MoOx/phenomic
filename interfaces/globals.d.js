declare function cwd(): string;

declare var process: {
  env: {
    NODE_ENV? : "production",
    PHENOMIC_USER_URL: string,
    PHENOMIC_USER_PATHNAME: string,
    PHENOMIC_NAME: string,
    PHENOMIC_VERSION: string,
    PHENOMIC_HOMEPAGE: string,
    PHENOMIC_REPOSITORY: string,
  },
  cwd: cwd,
  agrv: Array<string>,
}

declare var window: {
  __COLLECTION__: PhenomicCollection,
  location: Object,
}
