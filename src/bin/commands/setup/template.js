/* eslint-disable max-len */
const template = {
  "private": true,
  "name": undefined,
  "homepage": undefined,
  "scripts": {
    "lint:js": "eslint --fix .",
    "lint:css": "stylelint \"web_modules/**/*.css\"",
    "lint": "npm run lint:js && npm run lint:css",
    "start": "statinamic start",
    "build": "statinamic build",
    "pretest": "npm run lint",
    "test": "npm run build",
  },
  "statinamic": {/* placeholder */},
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
  "eslintConfigRuleReact/prefer-stateless-function": "https://github.com/MoOx/statinamic/issues/46",
  "stylelint": {
    "extends": "stylelint-config-standard",
  },
  "devDependencies": {},
}

export default template
