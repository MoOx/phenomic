export default function loadAsync(filename, callback) {
  require([ "bundle!../content/" + filename ], bundledResult => {
    bundledResult(result => callback(result))
  })
}
