// @flow

export default (
  {
    result,
    frontMatter,
  }: PhenomicContentLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    rawBody: frontMatter.content,
  }
}
