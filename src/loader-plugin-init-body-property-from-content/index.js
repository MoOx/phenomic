export default (
  {
    result,
    frontMatter,
  }: PhenomicLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    body: frontMatter.content,
  }
}

