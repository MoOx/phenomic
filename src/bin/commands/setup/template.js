/* eslint-disable max-len */
const template = {
  "private": true,
  "name": undefined,
  "homepage": undefined,
  "twitter": undefined,
  "repository": undefined,
  "scripts": {
    "lint:js": "eslint --ignore-path .gitignore --fix .",
    "lint:css": "stylelint \"src/**/*.css\"",
    "lint": "npm-run-all --parallel lint:*",
    "start": "phenomic start",
    "build": "phenomic build",
    "pretest": "npm run lint",
    "test": "npm run build",
  },
  "phenomic": {/* placeholder */},
  "babel": {
    "env": {
      "development": {
        "presets": [
          "babel-preset-es2015",
          "babel-preset-stage-1",
          "babel-preset-react",
        ],
      },
      "production": {
        "presets": [
          "babel-preset-es2015",
          "babel-preset-stage-1",
          "babel-preset-react",
        ],
      },
      "webpack-development": {
        "presets": [
          [
            "babel-preset-es2015",
            {
              "modules": false,
            },
          ],
          "babel-preset-stage-1",
          "babel-preset-react",
        ],
        "plugins": [
          "react-hot-loader/babel",
        ],
      },
      "webpack-production": {
        "presets": [
          "babel-preset-react-optimize",
          [
            "babel-preset-es2015",
            {
              "modules": false,
            },
          ],
          "babel-preset-stage-1",
          "babel-preset-react",
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
