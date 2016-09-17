import { stringify } from "querystring"

import type {
  fileType,
  fileTypeWebpack2,
} from "./define-loader.flow.js"

/*
 * Convert loader object from webpack 2 format to webpack 1
 * NOTE: This must be run after the config was formated convert-to-webpack-2.js
 */
const convertToWebpack1 = (
  fileType: fileTypeWebpack2
): fileType => {
  const loaders = fileType.loaders.map((loader) => {
    if (!loader.hasOwnProperty("query")) {
      return loader.loader
    }

    return loader.loader + "?" + stringify(loader.query)
  })

  return {
    ...fileType,
    loaders,
  }
}

export default convertToWebpack1
