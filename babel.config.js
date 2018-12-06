module.exports = {
  //   babelrcRoots: [".", "packages/*"],
  presets: [
    "@babel/preset-flow",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-object-rest-spread",
    [
      `@babel/plugin-transform-runtime`,
      {
        helpers: true,
        regenerator: true,
      },
    ],
  ],
};
