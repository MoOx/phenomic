---
title: How to add LESS support
---

So if you want to add some global LESS to your phenomic (for components, you'd better use scoped CSS modules) :

 - Add a `layouts/LayoutContainer/index.global.less` file
 - Require it from `layouts/LayoutContainer/index.global.less` with `import "./index.global.less"`
 - Install dependencies : `npm i -S less less-loader`

In `webpack.config.babel.js`, add a LESS module loader :

```js
  {
    test: /\.global\.less$/,
    include: path.resolve(__dirname, "web_modules"),
    loader: ExtractTextPlugin.extract(
      "style-loader",
      [ "css-loader", "less-loader" ].join("!"),
    )
  }
```

