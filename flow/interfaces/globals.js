declare var process: {
  env: {
    BABEL_ENV?: string,
    NODE_ENV?: string,
    PHENOMIC_USER_URL: string,
    PHENOMIC_USER_PATHNAME: string,
    PHENOMIC_NAME: string,
    PHENOMIC_VERSION: string,
    PHENOMIC_HOMEPAGE: string,
    PHENOMIC_REPOSITORY: string,
  },
  cwd: () => string,
  agrv: Array<string>,
}

declare var window: {
  __COLLECTION__: PhenomicCollection,
  location: Object,
}

export type Url = {
  href: string,
  protocol?: string,
  slashes?: boolean,
  host?: string,
  auth?: string,
  hostname?: string,
  port?: string,
  pathname?: string,
  search?: string,
  path?: string,
  query?: Object,
  hash?: string,
}
