import path from "path"

// ! client side loader only \\
export default ({ config, pkg }) => {
  const { webpackConfig } = config
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      loaders: [
        ...webpackConfig.module.loaders,
        {
          test: /\.json$/,
          loader: "json-loader",
        },
        {
          test: /\.js$/,
          loaders: [
            "babel-loader?" +
            // hack for babel config to undo babel-plugin-webpack-loaders effect
            JSON.stringify({
              ...pkg.babel,
              // add hot loading/error reporting for development
              presets: [
                ...pkg.babel.presets,
                ...config.dev && [ "babel-preset-react-hmre" ],
              ],
              // forget "statinamic" env
              env: { ...pkg.babel.env, "statinamic": undefined },
              // prevent babel going to use your original config
              babelrc: false,
            }),
            "eslint-loader?fix",
          ],
          include: [
            path.resolve(config.cwd, "scripts"),
            path.resolve(config.cwd, "web_modules"),
            // because docs use non transpiled code
            path.resolve(config.cwd, "..", "src"),
          ],
        },
      ],
    },

    entry: {
      "statinamic-client": path.join(__dirname, "index-client"),
    },
  }
}
