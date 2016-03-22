---
title: Good practices
---

## Linting

Our boilerplate comes with best-in-class tools for linting both JavaScript
and CSS. Linting your code is a good practice because it reduces the probability
of errors and helps to enforce code consistency.

## JavaScript Linting

[ESLint](http://eslint.org/) is a must have JavaScript linter; the default
boilerplate provides you with a nice [standard set of rules](https://github.com/MoOx/eslint-config-i-am-meticulous)
for ES2015+ & React.

That being said, you might want less rules (or semicolons).

### Less strict JavaScript linting

To remove the default config, you can replace the ``eslintConfig`` in your
``package.json`` with the following config:

```json
{
  "eslintConfig": {
    "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true
      },
    },
    "env": {
      "node": true,
      "browser": true,
      "es6": true
    }
  }
}
```

In this example, we used ``eslint:recommended``, but feel free to use one of the
[many existing configs](https://www.npmjs.com/search?q=eslint-config).
Here are some "popular" configs:

- https://github.com/feross/eslint-config-standard
- https://github.com/feross/eslint-config-standard-react
- https://github.com/sindresorhus/eslint-config-xo
- https://github.com/sindresorhus/eslint-config-xo-react

If you switch to one of these configurations, you might get some linting errors.
To fix this, simply use the following command:

```sh
$ ./node_modules/.bin/eslint --fix .
```

This will fix all the errors that ESLint or its plugins can handle.

## CSS Linting

[stylelint](http://stylelint.io/) is a must have CSS linter; the default
boilerplate provides you with a nice [standard set of rules](https://github.com/stylelint/stylelint-config-standard)
for modern CSS development.
