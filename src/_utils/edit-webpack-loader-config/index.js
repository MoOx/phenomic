// @flow
import convertToWebpack2 from "./convert-to-webpack-2"
import convertToWebpack1 from "./convert-to-webpack-1"

// TODO: Handle if one loader is used multiple times

const editWebpackLoaderConfig = (
  config: WebpackConfig,
  loaderName: string,
  queryEdition: Object,
  isThisWebpack2: bool = false
): WebpackConfig => {
  if (
    config.module.hasOwnProperty("loader") &&
    !Array.isArray(config.module.loaders)
  ) {
    throw new Error("config parameter must be a valid webpack config")
  }

  const fileTypes = config.module.loaders
    .map((fileType) => convertToWebpack2(fileType))
    .map((fileType) => {
      const loaders = fileType.loaders
        .map((loader) => {
          const currentLoaderName = loader.loader
          // Yeah, this is the loader that we are looking for
          if (
            currentLoaderName === loaderName ||
            currentLoaderName === loaderName.replace("-loader", "") ||
            currentLoaderName === loaderName + "-loader"
          ) {
            return {
              ...loader,
              query: {
                ...loader.query,
                ...queryEdition,
              },
            }
          }

          return loader
        })

      return {
        ...fileType,
        loaders,
      }
    })

  // Return edited webpack fileTypes format
  if (isThisWebpack2) {
    return {
      ...config,
      module: {
        ...config.module,
        loaders: fileTypes,
      },
    }
  }
  // convert fileTypes back to webpack 1 format and return
  else {
    return {
      ...config,
      module: {
        ...config.module,
        loaders: fileTypes.map((fileType) => convertToWebpack1(fileType)),
      },
    }
  }

}

export default editWebpackLoaderConfig

export const test = (
  config: Array<Object>,
  ...args: Array<any>
): WebpackConfig => (
  editWebpackLoaderConfig({
    module: {
      loaders: config,
    },
  }, ...args).module.loaders
)
