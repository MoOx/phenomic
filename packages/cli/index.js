#!/usr/bin/env node

// require by babel-preset-react-app
// This is used like this since babel transformed file don't finish
// on the client
// webpack (or similar) handle their own env.
// anyway it's redifined a bit later by start/build commands
process.env.BABEL_ENV = "development";

// this babel register is mainly so you can have a webpack config file in es6
// without a .babel extension
require("babel-register")({
  presets: [
    // used to allow import/export
    // see https://github.com/phenomic/phenomic/issues/1170
    require.resolve("babel-preset-env"),
    // used to allow react/flow in Html.js for plugin react
    // @todo: consider moving babel-register in this plugin for this file only?
    require.resolve("babel-preset-react")
  ],
  sourceMap: "inline"
});

// $FlowFixMe lib/* are ignored
require("./lib/bin.js");
