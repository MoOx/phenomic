---
title: How to setup statinamic
---

## Setup the boilerplate

In order to get your engine ready, you need to:

* initialize your bundles
  (
    [client](https://github.com/MoOx/statinamic/blob/master/demo/index-client.js) +
    [static](https://github.com/MoOx/statinamic/blob/master/demo/index-static.js)
  ) with:
  - your layout [components](https://github.com/MoOx/statinamic/blob/master/demo/web_modules/app/pageComponents.js)
  - some [routes](https://github.com/MoOx/statinamic/blob/master/demo/web_modules/app/routes.js)
  - a [store](https://github.com/MoOx/statinamic/blob/master/demo/web_modules/app/store.js) to keep data in memory
* create your [build script](https://github.com/MoOx/statinamic/blob/master/demo/build.js) so you can:
  * define your configuration
    (eg: webpack loaders to add your favorite css preprocessor)
  * run the dev server (`(babel-)node build --dev-server --dev`)
  * build the static version for production (`(babel-)node build --static --production`)

For that you will mainly need to:

* write or reuse [React components](http://react-components.com/)
  (you can get the [components](https://github.com/MoOx/statinamic/tree/master/demo/web_modules) of the demo)
* tweak [webpack configuration](http://webpack.github.io/docs) in the build script
  so you can consume images, svg, css or whatever you want.

Check out the [demo source code](https://github.com/MoOx/statinamic/tree/master/demo).

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
  with [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-server.html)
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

* [react-transform-webpack-hmr](https://github.com/gaearon/react-transform-webpack-hmr)
  for hotloading during development and some others friends from
  [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)
* [tape](https://github.com/substack/tape)
  for unit tests.

_⚠︎ The packages above are used in the [demo](https://github.com/MoOx/statinamic/tree/master/demo)._

This project has been inspired by
[react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example/)
