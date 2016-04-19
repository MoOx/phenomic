/* eslint-disable max-len */
const template = {
  "private": true,
  "name": undefined,
  "homepage": undefined,
  "scripts": {
    "lint:js": "eslint --fix .",
    "lint:css": "stylelint \"web_modules/**/*.css\"",
    "lint": "npm-run-all --parallel lint:*",
    "start": "phenomic start",
    "build": "phenomic build",
    "pretest": "npm run lint",
    "test": "npm run build",
  },
  "phenomic": {/* placeholder */},
  "babel": {
    "presets": [
      "react",
      "es2015",
      "stage-1",
    ],
  },
  "eslintConfig": {
    "parser": "babel-eslint",
    "extends": [
      "eslint-config-i-am-meticulous/react",
    ],
    "rules": {
      "react/prefer-stateless-function": 0,
    },
  },
  "eslintConfigRuleReact/prefer-stateless-function": "https://github.com/MoOx/phenomic/issues/46",
  "stylelint": {
    "extends": "stylelint-config-standard",
  },
  "devDependencies": {},
}

export default template
