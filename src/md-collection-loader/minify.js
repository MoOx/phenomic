export default (collection) => {
  if (!Array.isArray(collection)) {
    throw new Error(
      `minify except a valid collection instead of ${ typeof collection }`
    )
  }

  return collection.map((item) => ({
    ...item.head,
    __filename: item.__filename,
    __url: item.__url,
  }))
}
