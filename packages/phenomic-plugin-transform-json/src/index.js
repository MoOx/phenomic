import path from "path"

const debug = require("debug")("phenomic:plugin:transform-json")

function transformJSONFile(file: Object, contents: string) {
  debug(`transforming ${ file.name }`)

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
    name: "phenomic-plugin-transform-json",
    supportedFileTypes: [ "json" ],
    transform: transformJSONFile,
  }
}
