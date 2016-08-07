---
title: Explanation about how the engine works
incomplete: true
---

During the build process, markdown files are transformed into JSON; one part
with the YAML metadata, and one part with the HTML body. So both client and
server can easily consume these markdown files (as JSON) in order to render
pages from React components.

On top of that, you can easily add your own logic to style your pages the way
that you like, whether that is via CSS files or inline styles. You can even
create your own pages from plain React components; Phenomic is just a helper.

## The boilerplate

* initialize your bundles
  (
    [client](https://github.com/MoOx/phenomic/blob/master/src/boilerplate/scripts/index-client.js) +
    [static](https://github.com/MoOx/phenomic/blob/master/src/boilerplate/scripts/index-static.js)
  ) with:
  - your [layout components](https://github.com/MoOx/phenomic/blob/master/src/boilerplate/web_modules/layouts/index.js)
  - some [routes](https://github.com/MoOx/phenomic/blob/master/src/boilerplate/web_modules/app/routes.js)
  - a [store](https://github.com/MoOx/phenomic/blob/master/src/boilerplate/web_modules/app/store.js) to keep data in memory
* create your [build script](https://github.com/MoOx/phenomic/blob/master/src/boilerplate/scripts/build.js) so you can:
  * define your configuration
    (eg: webpack loaders to add your favorite css preprocessor)
  * run the dev server (`(babel-)node build --server --dev`)
  * build the static version for production (`(babel-)node build --static --production`)

Optionally, you can:

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
  for an awesome DX (developer experience).
* [Express](http://expressjs.com/) with some middlewares for development:
  * [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-server.html)
    for watching
  * [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
    for hot reload
