import { parseQuery } from "loader-utils"

import type {
  fileType,
  fileTypeWebpack2,
  loaderDefWebpack2,
} from "./define-loader.flow.js"

/*
 * Normalize loader config to Webpack 2 format
 */
const convertToWebpack2 = (
  fileType: fileType
): fileTypeWebpack2 => {
  if (fileType.hasOwnProperty("loader")) {
    const { loader, ...others } = fileType

    const loaders = loader.split("!")
      .map((loader) => parseLoaderString(loader))

    return {
      ...others,
      loaders,
    }
  }

  if (fileType.hasOwnProperty("loaders")) {
    const loaders = fileType.loaders.map((loader) => {
      if (typeof loader === "string") {
        return parseLoaderString(loader)
      }
      return loader
    })

    return {
      ...fileType,
      loaders,
    }
  }

  return fileType
}

const parseLoaderString = (loaderString: string): loaderDefWebpack2 => {
  const pos = loaderString.indexOf("?")
  // This loader doesn't have query
  if (pos <= -1) {
    return {
      loader: loaderString,
    }
  }

  // parse query string here
  const name = loaderString.substr(0, pos)
  const queryString = loaderString.slice(pos)

  return {
    loader: name,
    query: parseQuery(queryString),
  }
}

export default convertToWebpack2
