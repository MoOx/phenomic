---
title: How to setup Statinamic
---

Statinamic require a minimal boilerplate, in order to provide you some
flexibility.
, you can just run the following:

## The boilerplate

To get the default boilerplate,
copy [statinamic/src/boilerplate](https://github.com/MoOx/statinamic/tree/master/src/boilerplate)
into a (fresh) local directory.

_Feel free to adjust the `package.json` to your need.
Just keep the `scripts` `start` and `static`._

When you have the boilerplate in place:

```console
$ npm install --save-dev statinamic
```

For npm@3+ (to get required `peerDependencies`):

```console
$ ./node_modules/.bin/statinamic setup
```

Note: You can use `$ statinamic` directly by adding `./node_modules/.bin` to
your `PATH`.
It's a good way to avoid global npm package while still being able to use
`bin`s from local `node_modules`.

### More explanation about the boilerplate

The default boilerplate:

* initialize your bundles
  (
    [client](https://github.com/MoOx/statinamic/blob/master/src/boilerplate/scripts/index-client.js) +
    [static](https://github.com/MoOx/statinamic/blob/master/src/boilerplate/scripts/index-static.js)
  ) with:
  - your layout [components](https://github.com/MoOx/statinamic/blob/master/src/boilerplate/web_modules/app/pageComponents.js)
  - some [routes](https://github.com/MoOx/statinamic/blob/master/src/boilerplate/web_modules/app/routes.js)
  - a [store](https://github.com/MoOx/statinamic/blob/master/src/boilerplate/web_modules/app/store.js) to keep data in memory
* create your [build script](https://github.com/MoOx/statinamic/blob/master/src/boilerplate/scripts/build.js) so you can:
  * define your configuration
    (eg: webpack loaders to add your favorite css preprocessor)
  * run the dev server (`(babel-)node build --server --dev`)
  * build the static version for production (`(babel-)node build --static --production`)

You might as well need to:

* write or reuse [React components](http://react-components.com/)
* tweak [webpack configuration](http://webpack.github.io/docs) in the build script
  so you can consume images, svg, css or whatever you want.

## Linting

ADD DEFAULT RULES IN boilerplate

{
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "ecmaFeatures": {
        "modules": true
    },
    "rules": {
    }
}
+
https://github.com/MoOx/statinamic/blob/master/docs/package.json#L77-L79

## Hot reloading & Visual Errors

![hmre](https://cloud.githubusercontent.com/assets/1539088/11611771/ae1a6bd8-9bac-11e5-9206-42447e0fe064.gif)

In order to benefit of hot-loading and visual javascript errors, you can add
a babel preset:

```console
$ npm i -D babel-preset-react-hmre
```

```json
{
  "babel": {
    "presets": [
      "react",
      "es2015",
      "stage-0"
    ],
    "env": {
      "development": {
        "presets": [
          "react-hmre"
        ]
      }
    }
  }
}
```

---

## Explanation about how the engine works

During the build process, markdown files are parsed, and transformed as JSON
files (one part with the YAML header meta informations, one part with the body
as HTML).
So both client and server can easily consume markdown files (as json) in order
to render pages from React components. That's it !

On top of that you can add pretty much whatever you want to write styles the way
you like (CSS, inlines styles...) and you can even create your own pages from
plain React components. This generator is just an helper.

### Packages used

* [Babel](http://babeljs.io)
  for writing ES6 and ES7
* [Webpack](http://webpack.github.io)
  for bundling,
* [Express](http://expressjs.com/) with some middlewares for development:
  * [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-server.html)
    for watching
  * [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
    for hot reload
* [React](https://github.com/facebook/react)
  for writing UI
* [React Router](https://github.com/rackt/react-router)
  for routing
* [Redux](https://github.com/gaearon/redux)
  for handling application state
  (a better [Flux](http://facebook.github.io/flux/)implementation)
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools)
  for awesome DX (developer experience).
* [react-helmet](https://github.com/nfl/react-helmet)
  for handling pages meta tags (title and meta...)

## Some packages that might helps

* [ava](https://github.com/sindresorhus/ava)
  for unit tests.
