import path from "path"

import readFile from "../utils/readFile"

const debug = require("debug")("phenomic:core:injection")

const defaultTransformPlugin: TransformPlugin = {
  name: "phenomic-plugin-default-transform",
  supportedFileTypes: [],
  transform(file, fileContents) {
    return {
      partial: null,
      data: {
        body: fileContents,
      },
    }
  },
}

async function processFile(
  db: PhenomicDB,
  file: PhenomicContentFile,
  transformers: PhenomicPlugins,
  collectors: PhenomicPlugins,
  isProduction: boolean
) {
  debug(`processing ${ file.name }`)
  const fileContents = await readFile(file.fullpath)
  const transformPlugin = transformers.find((plugin) => (
    Array.isArray(plugin.supportedFileTypes) &&
    plugin.supportedFileTypes.indexOf(path.extname(file.name).slice(1)) !== -1
  ))
  const parsed = await (transformPlugin || defaultTransformPlugin).transform(file, fileContents)
  debug(`${ file.name } processed`)
  // Don't show drafts in production
  if (isProduction && parsed.draft) {
    debug(`${ file.name } skipped because it's a draft`)
    return
  }

  return await collectors.forEach((collector) => collector.collect(db, file.name, parsed))
}

export default processFile
