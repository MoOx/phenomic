// @flow

export default (
  {
    result,
    frontMatter,
  }: PhenomicLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    rawBody: frontMatter.content,
  }
}

