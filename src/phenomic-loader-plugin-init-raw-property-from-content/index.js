// @flow

export default (
  {
    result,
    frontMatter,
  }: PhenomicLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    raw: frontMatter.orig,
  }
}

