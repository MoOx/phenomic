---
title: Explanation about how the engine works
incomplete: true
---

During the build process, markdown files are parsed, and transformed as JSON
files (one part with the YAML header meta informations, one part with the body
as HTML).
So both client and server can easily consume markdown files (as json) in order
to render pages from React components. That's it !

On top of that you can add pretty much whatever you want to write styles the way
you like (CSS, inlines styles...) and you can even create your own pages from
plain React components. Statinamic is just an helper.

## The boilerplate

* initialize your bundles
  (
    [client](https://github.com/MoOx/statinamic/blob/master/src/boilerplate/scripts/index-client.js) +
    [static](https://github.com/MoOx/statinamic/blob/master/src/boilerplate/scripts/index-static.js)
  ) with:
  - your [layout components](https://github.com/MoOx/statinamic/blob/master/src/boilerplate/web_modules/app/pageComponents.js)
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

### Packages used

* [React](https://github.com/facebook/react)
  for writing UI
* [Babel](http://babeljs.io)
  to be able to use ES6/ES2015 today,
* [Webpack](http://webpack.github.io)
  for bundling,
* [Redux](https://github.com/gaearon/redux)
  for handling application state
  (a better [Flux](http://facebook.github.io/flux/) implementation)

#### Some more (but still) important packages

* [React Router](https://github.com/rackt/react-router)
  for routing
* [React Helmet](https://github.com/nfl/react-helmet)
  for handling pages meta tags (title and meta...)
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools)
  for awesome DX (developer experience).
* [Express](http://expressjs.com/) with some middlewares for development:
  * [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-server.html)
    for watching
  * [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
    for hot reload
