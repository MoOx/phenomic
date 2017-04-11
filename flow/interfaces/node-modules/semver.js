declare module "semver" {
  declare interface Semver {
    satisfies: (requirement?: string, version: string) => boolean,
  }

  declare module.exports: Semver;
}
