import path from "path"

function transformJSONFile(file, contents) {
  const data = {
    ...JSON.parse(contents),
    path: path.basename(file.name, ".json"),
  }
  const {
    // forget unwanted body
    body, // eslint-disable-line
    // partial is what we want
    ...partial
  } = data
  return {
    data,
    partial,
  }
}

export default function() {
  return {
    supportedFileTypes: [ "json" ],
    transform: transformJSONFile,
  }
}
