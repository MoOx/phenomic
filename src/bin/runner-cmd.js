#!/usr/bin/env babel-node

// babel register, yeah
require("babel-register")({
  "plugins": [
    [
      "babel-plugin-webpack-loaders",
      {
        "config": require("path").join(
          __dirname, "webpack.config.babel.js"
        ),
        "verbose": false,
      },
    ],
  ],
})

require(process.argv[2])
