export default (
  {
    result,
    options,
  }: PhenomicLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    ...options && options.defaultHead && {
      head: {
        ...options.defaultHead,
        ...result.head,
      },
    },
  }
}
