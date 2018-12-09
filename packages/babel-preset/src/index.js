// @flow

// most of this has been inspired by
// https://github.com/facebook/create-react-app/tree/master/packages/babel-preset-react-app

module.exports = () => ({
  presets: [
    [
      require("@babel/preset-env"),
      {
        ...(process.env.PHENOMIC_ENV === "static"
          ? {
              targets: {
                node: "current",
              },
            }
          : {
              // Do not transform modules to CJS since bundler like webpack handle it
              modules: false,
            }),
        // If users import all core-js they're probably not concerned with
        // bundle size. We shouldn't rely on magic to try and shrink it.
        useBuiltIns: false,
        // Exclude transforms that make all code slower
        exclude: ["transform-typeof-symbol"],
      },
    ],
    [
      require("@babel/preset-react"),
      {
        // Adds component stack to warning messages
        // Adds __self attribute to JSX which React will use for some warnings
        development: process.env.PHENOMIC_ENV !== "static",
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        useBuiltIns: true,
      },
    ],
    require("@babel/preset-flow"),
  ],
  plugins: [
    // Enable loose mode to use assignment instead of defineProperty
    // See discussion in https://github.com/facebook/create-react-app/issues/4263
    [
      require("@babel/plugin-proposal-class-properties"),
      {
        loose: true,
      },
    ],
    // The following two plugins use Object.assign directly, instead of Babel's
    // extends helper. Note that this assumes `Object.assign` is available.
    // { ...todo, completed: true }
    [
      require("@babel/plugin-proposal-object-rest-spread"),
      {
        useBuiltIns: true,
      },
    ],
    // Polyfills the runtime needed for async/await, generators, and friends
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      require("@babel/plugin-transform-runtime"),
      {
        corejs: false,
        helpers: false,
        regenerator: true,
        useESModules: process.env.PHENOMIC_ENV === "static",
      },
    ],
    ...(process.env.NODE_ENV === "production"
      ? [
          [
            // Remove PropTypes from production build
            require("babel-plugin-transform-react-remove-prop-types"),
            {
              removeImport: true,
            },
          ],
        ]
      : []),
    // Adds syntax support for import()
    require("@babel/plugin-syntax-dynamic-import"),
    // Transform dynamic import to require
    ...(process.env.PHENOMIC_ENV === "static"
      ? [require("babel-plugin-dynamic-import-node")]
      : []),
  ],
});
