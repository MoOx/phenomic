// @flow

module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "plugins": [
    "react"
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
}
