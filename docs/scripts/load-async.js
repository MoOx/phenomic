import fileFromContext from "statinamic/lib/file-from-context"

export default function loadAsync(filename, callback) {
  if (__PROD__) {
    const bundledResult = require("bundle!../content/" + filename)
    bundledResult(result => callback(result))
  }
  else if (__DEV__) {
    let context = require.context("../content", true, /\.md$/)
    callback(fileFromContext(context, filename))

    if (module.hot) {
      module.hot.accept(context.id, function() {
        context = require.context("../content", true, /\.md$/)
        callback(fileFromContext(context, filename))
      })
    }
  }
}
