// @flow

export default (
  {
    result,
    options,
  }: PhenomicContentLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    ...options.defaultHead && { head: options.defaultHead },
  }
}
