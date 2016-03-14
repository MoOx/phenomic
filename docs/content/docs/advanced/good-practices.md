---
title: Good practices
---

## Linting

Linting your code is a good practice. That's why by default, you got some rules.

## JavaScript Linting

[ESLint](http://eslint.org/) is a must have to enforce coding convention and to
prevent some syntax errors.
The default boilerplate provide you a particular ruleset
[eslint-config-i-am-meticulous](https://github.com/MoOx/eslint-config-i-am-meticulous)
which provide a nice standard when you work is ES2015+ and React.

That said, you might want less rules (or semicolons).

### Less strict JavaScript linting

To remove the default config, you can replace the ``eslintConfig`` in your
``package.json`` with the following eslint config :

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

If you switch to one of this configuration, you might get some linting errors.
To fix that, simply use the following command:

```console
$ ./node_modules/.bin/eslint --fix .
```

This will fix all the errors that ESLint or plugins can handle.

## No JavaScript linting ?

Please don't do that.
But if you really just want linting for syntax (at least, you should do that),
you can remove from the config above the `extends` line.


## CSS Linting

[stylelint](http://stylelint.io/) is a must have to enforce coding convention
and to prevent some syntax errors.
The default boilerplate provide you a standard ruleset
[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)
which provide a nice standard when you work is modern CSS.

## No CSS linting ?

Please don't do that.
