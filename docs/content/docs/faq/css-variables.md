---
title: How to add global variables with cssnext
---

If you want to share some variables in your CSS modules, you can use cssnext to do so :

Add a `customProperties.variables` entry in `webpack.config.babel.js` :

> You could also require a file here

```js
require("postcss-cssnext")({
  browsers: "last 2 versions",
  features: {
    customProperties: {
      variables: {
        successColor: 'green',
        errorColor: 'red'
      }
    }
  }
})
```

Now simply use the variable in your CSS modules :

```css
.buttonSuccess {
  color: var(--successColor);
}
```

