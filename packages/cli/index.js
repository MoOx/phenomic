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
  presets: [require.resolve("@phenomic/babel-preset")],
  sourceMap: "inline"
});

// $FlowFixMe lib/* are ignored
require("./lib/bin.js");
