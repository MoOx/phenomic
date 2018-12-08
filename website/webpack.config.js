// @flow

import defaultWebpackConfig from "@phenomic/plugin-bundler-webpack/lib/webpack.config.js"; // eslint-disable-line

export default (config: PhenomicConfig) => {
  const webpackConfig = defaultWebpackConfig(config);
  return {
    ...webpackConfig,
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        "react-native$": "react-native-web",
      },
    },
    performance: {
      hints: false,
    },
  };
};
