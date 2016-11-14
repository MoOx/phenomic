---
title: Good practices
---

## Linting

Our base theme comes with best-in-class tools for linting both JavaScript
and CSS.
Linting your code is a good practice because it reduces the probability
of errors and helps to enforce code consistency.

## JavaScript Linting

[ESLint](http://eslint.org/) is a must have JavaScript linter.
The base theme provides you with a standard set of rules for ES2015+ & React
(via eslint and eslint-plugin-react recommended config).  
You can look at it by [reading the extended file](https://github.com/MoOx/phenomic/blob/master/src/eslint-config-recommended/index.js)

### Alternative config

Feel free to use one of the
[many existing configs](https://www.npmjs.com/search?q=eslint-config).

Here are some "popular" configs:

- https://github.com/feross/eslint-config-standard
- https://github.com/feross/eslint-config-standard-react
- https://github.com/sindresorhus/eslint-config-xo
- https://github.com/sindresorhus/eslint-config-xo-react
- https://github.com/MoOx/eslint-config-i-am-meticulous

If you switch to one of these configurations, you might get some linting errors.
To fix most of this errors, use the following command:

```sh
./node_modules/.bin/eslint --fix .
```

This will fix all the errors that ESLint or its plugins can handle.

## CSS Linting

[stylelint](http://stylelint.io/) is a must have CSS linter; the default
phenomic-theme-base provides you with a very minimal set of rules to prevent
errors, but we recommend you to use the nice
[standard set of rules](https://github.com/stylelint/stylelint-config-standard)
for modern CSS development.
