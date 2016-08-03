// @flow

export default (
  {
    result,
    frontMatter,
  }: PhenomicContentLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    body: frontMatter.content,
  }
}
