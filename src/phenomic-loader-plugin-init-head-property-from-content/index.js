// @flow

export default (
  {
    result,
    frontMatter,
  }: PhenomicLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    head: {
      ...result.head,
      // poor workaround to normalize date as string
      // blocked by https://github.com/MoOx/phenomic/issues/397
      ...JSON.parse(JSON.stringify(frontMatter.data)),
      // should be something simpler, normalized earlier in frontMatter
      // ...frontMatter.data,
    },
  }
}

