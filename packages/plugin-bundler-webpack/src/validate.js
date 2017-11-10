import multili from "multili";

const typeOf = value => {
  const type = typeof value;
  if (Array.isArray(value)) {
    return "array";
  }
  if (value === null) {
    return "null";
  }
  return type;
};

export default (webpackConfig: Object, config: PhenomicConfig) => {
  if (!webpackConfig.entry || !webpackConfig.entry[config.bundleName]) {
    let error = `@phenomic/plugin-bundler-webpack expects an entry named '${
      config.bundleName
    }' in your webpack config.\n`;
    // be careful about the indentation here
    let adviceCode = `[
            process.env.PHENOMIC_ENV !== "static" && require.resolve("webpack-hot-middleware/client"),
            process.env.PHENOMIC_ENV !== "static" && require.resolve("react-hot-loader/patch"),
            "./App.js"
          ].filter(item => item)`;
    const type = typeOf(webpackConfig.entry);
    if (type === "object") {
      // $FlowFixMe here we know we have an object, see typeOf function
      error += `Your current entries keys are '${Object.keys(
        webpackConfig.entry
      )}'.\n`;
    } else {
      error += `Your current entry is of type '${type}'.\n`;
    }
    if (type === "string" || type === "array") {
      adviceCode = JSON.stringify(webpackConfig.entry);
    }
    error += multili(`
      Please use an object like this:

        entry: {
          "phenomic.main": ${adviceCode},
        }

    `);
    throw new Error(error);
  }
};
