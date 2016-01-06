---
title: Good practises
incomplete: true
---

## Linting

Linting your code is a good practice.
You can easily add a good convention by adding
[ESLint](http://eslint.org/) with a existing config like
[eslint-config-i-am-meticulous](https://github.com/MoOx/eslint-config-i-am-meticulous).

By default, ESLint and the above config is already added in your dependencies.  
You just need to add your `package.json` the following eslint config :

```json
{
  "eslintConfig": {
    "extends": [
      "eslint-config-i-am-meticulous",
      "eslint-config-i-am-meticulous/react"
    ]
  }
}
```
