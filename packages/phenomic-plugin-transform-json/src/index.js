const path = require("path")

function transformJSONFile(file, contents) {
  const data = {
    ...JSON.parse(contents),
    path: path.basename(file.name, ".json"),
  }
  const { body, ...partial } = data
  return {
    data,
    partial,
  }
}

module.exports = function() {
  return {
    supportedFileTypes: [ "json" ],
    transform: transformJSONFile,
  }
}
