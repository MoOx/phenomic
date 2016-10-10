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
  "#babel": "webpack-(development|production) are useful for webpack 2, otherwise use development|production",
  "babel": {
    "env": {
      "development": {
        "presets": [
          "babel-preset-latest",
          "babel-preset-stage-1",
          "babel-preset-react",
        ],
        "plugins": [
          "babel-plugin-transform-react-jsx-source",
          "babel-plugin-transform-react-jsx-self",
          "react-hot-loader/babel",
        ],
      },
      "production": {
        "presets": [
          "babel-preset-react-optimize",
          "babel-preset-latest",
          "babel-preset-stage-1",
          "babel-preset-react",
        ],
      },
      "webpack-development": {
        "presets": [
          [
            "babel-preset-latest",
            {
              "es2015": {
                "modules": false,
              },
            },
          ],
          "babel-preset-stage-1",
          "babel-preset-react",
        ],
        "plugins": [
          "babel-plugin-transform-react-jsx-source",
          "babel-plugin-transform-react-jsx-self",
          "react-hot-loader/babel",
        ],
      },
      "webpack-production": {
        "presets": [
          "babel-preset-react-optimize",
          [
            "babel-preset-latest",
            {
              "es2015": {
                "modules": false,
              },
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
      "eslint:recommended",
      "plugin:react/recommended",
    ],
    "env": {
      "browser": true,
      "node": true,
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true,
        "generators": true,
        "experimentalObjectRestSpread": true,
      },
    },
  },
  "stylelint": {
    "extends": "stylelint-config-standard",
  },
  "devDependencies": {},
}

export default template
