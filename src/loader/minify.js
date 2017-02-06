export default (
  collection: PhenomicCollection
): PhenomicCollection => {
  if (!Array.isArray(collection)) {
    throw new Error(
      `minify expect a valid collection instead of ${ typeof collection }`
    )
  }

  return collection.map((item) => ({
    ...item.head,
    __filename: item.__filename,
    __url: item.__url,
    __resourceUrl: item.__resourceUrl,
    __dataUrl: item.__dataUrl,
  }))
}
