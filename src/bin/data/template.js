/* eslint-disable max-len */
const template = {
  "private": true,
  "name": undefined,
  "homepage": undefined,
  "scripts": {
    "lint:js": "eslint --fix .",
    "lint:css": "stylelint \"web_modules/**/*.css\"",
    "lint": "npm run lint:js && npm run lint:css",
    "statinamic": "cross-env BABEL_DISABLE_CACHE=1 BABEL_ENV=statinamic DEBUG=statinamic:* babel-node scripts/build",
    "start": "npm run statinamic -- --server --open --dev",
    "build": "npm run statinamic -- --static --production",
    "pretest": "npm run lint",
    "test": "npm run build",
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
  "devDependencies": {},
}

export default template
