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
      "eslint-config-i-am-meticulous/react",
    ],
    "rules": {
      "import/order": "off",
      "import/newline-after-import": "off",
      "import/imports-first": "off",
      "import/no-mutable-exports": "off",
      "import/max-dependencies": "off",
      "import/default": "off",
      "import/no-namespace": "off",
      "import/namespace": "off",
      "react/jsx-indent": "off",
      "import/no-named-as-default": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-duplicates": "off",
      "react/no-children-prop": "off",
      "react/jsx-no-target-blank": "off",
      "import/no-unresolved": "off",
    },
  },
  "stylelint": {
    "extends": "stylelint-config-standard",
  },
  "devDependencies": {},
}

export default template
