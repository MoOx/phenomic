// @flow

export default (
  {
    result,
    frontMatter,
  }: PhenomicContentLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    raw: frontMatter.orig,
  }
}
