/**
 * @flow
 */
const readFile = require("../utils/readFile")
const path = require("path")

const defaultTransformPlugin: PhenomicTransformPlugin = {
  type: "transform",
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


async function processFile(db: PhenomicDB, file: PhenomicContentFile, plugins: Array<PhenomicPlugin>, isProduction: boolean) {
  const fileContents = await readFile(file.fullpath)
  const transformPlugin = plugins.find(plugin => {
    // $FlowIssue
    return Array.isArray(plugin.supportedFileTypes) &&
      plugin.supportedFileTypes.indexOf(path.extname(file.name).slice(1)) !== -1
  })
  // $FlowIssue
  const parsed = await (transformPlugin || defaultTransformPlugin).transform(file, fileContents)
  // Don't show drafts in production
  if(isProduction && parsed.draft) {
    return
  }
  const collector = plugins.find(item => item.type === "collector")
  if(collector && typeof collector.collect === "function") {
    await collector.collect(db, file.name, parsed)
  }
}

module.exports = processFile
