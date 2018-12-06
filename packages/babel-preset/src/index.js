// @flow

module.exports = () => ({
  presets: [
    require("@babel/preset-flow"),
    require("@babel/preset-react"),
    [
      require("@babel/preset-env"),
      process.env.PHENOMIC_ENV === "static"
        ? {
            targets: {
              node: "current",
            },
          }
        : {},
    ],
  ],
  plugins: [
    require("@babel/plugin-proposal-class-properties"),
    require("@babel/plugin-proposal-export-default-from"),
    require("@babel/plugin-proposal-export-namespace-from"),
    require("@babel/plugin-syntax-dynamic-import"),
    require("@babel/plugin-syntax-object-rest-spread"),
    require("@babel/plugin-transform-runtime"),
  ],
});
