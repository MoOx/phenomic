// @flow

module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "env": {
    "browser": true,
    "node": true,
  },
  "plugins": [
    "react",
  ],
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
