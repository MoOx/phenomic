import enhanceCollection from "statinamic/lib/enhance-collection"

const getFileFromContext = (context, filename) => {
  const bundledResult = context.keys().map(context)
  const result = enhanceCollection(bundledResult, {
    filter: { __filename: filename },
    limit: 1,
  })

  return result[0]
}

export default function loadAsync(filename, callback) {
  if (__PROD__) {
    const bundledResult = require("bundle!../content/" + filename)
    bundledResult(result => callback(result))
  }
  else if (__DEV__) {
    let context = require.context("../content", true, /\.md$/)
    callback(getFileFromContext(context, filename))

    if (module.hot) {
      module.hot.accept(context.id, function() {
        context = require.context("../content", true, /\.md$/)
        callback(getFileFromContext(context, filename))
      })
    }
  }
}
