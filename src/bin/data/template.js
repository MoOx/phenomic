/* eslint-disable max-len */
const template = {
  "private": true,
  "name": undefined,
  "homepage": undefined,
  "scripts": {
    "statinamic": "cross-env BABEL_ENV=statinamic DEBUG=statinamic:* babel-node scripts/build",
    "start": "npm run statinamic -- --server --open --dev",
    "build": "npm run statinamic -- --static --production",
  },
  "statinamic": {/* place holder */},
  "babel": {
    "presets": [
      "react",
      "es2015",
      "stage-1",
    ],
    "env": {
      "statinamic": {
        "plugins": [
          [
            "babel-plugin-webpack-loaders",
            {
              "config": "./scripts/webpack.config.babel.js",
              "verbose": false,
            },
          ],
        ],
      },
    },
  },
  "eslintConfig": {
    "parser": "babel-eslint",
    "extends": [
      "eslint-config-i-am-meticulous/react",
    ],
  },
  "stylelint": {
    "extends": "stylelint-config-standard",
  },
  "devDependencies": undefined,
}

export default template
