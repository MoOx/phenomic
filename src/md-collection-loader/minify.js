export default (collection) => collection.map((item) => ({
  ...item.head,
  __filename: item.__filename,
  __url: item.__url,
}))
