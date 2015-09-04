# statinamic

> A static website generator that create dynamic website using React components.

[![Travis Build Badge](https://img.shields.io/travis/MoOx/statinamic/master.svg)](https://travis-ci.org/MoOx/statinamic)

## Description

This website generator is like no other. Since it is based on React for the UI,
it can render pages on both client and server
(~~Isomorphic~~ [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9)
rendering).
It's a static website generator because it helps to generate a simple website
from markdown files (to HTML).

The nice part is that you can do a lot more.

## Install

```console
$ npm install MoOx/statinamic
```

## Usage

See [demo](demo) for now.

```console
$ npm install

# static build
$ npm test

# live demo
$ npm run demo
```

You will need to:

* initialize your bundle with your preferences, routes and components
* create your build script so you can
  * define your configuration
    (eg: webpack loaders to add your favorite css preprocessor)
  * run the dev server
  * build for production

---

## Explanation

During the build process, markdown files are parsed, and transformed as JSON
files (on part with the YAML header meta informations, on part with the body as
HTML). So both client and server can easily consume markdown files (as json) in
order to render pages from React components. That's it !

On top of that you can add pretty much whatever you want to write styles the way
you like (CSS, inlines styles...) and you can even create your own pages from
plain React components. This generator is just an helper

### Library used

* [React](https://github.com/facebook/react)
  for writing UI
* [React Router](https://github.com/rackt/react-router)
  for routing
* [Redux](https://github.com/gaearon/redux)
  for handling application state
  (a better [Flux](http://facebook.github.io/flux/)implementation)

### For development

* [Babel](http://babeljs.io)
  for writing ES6 and ES7
* [Webpack](http://webpack.github.io)
  for bundling.
* [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html)
  for easy development.
* [React Hot Loader](https://github.com/gaearon/react-hot-loader)
  for live development.
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools)
  for awesome DX (developer experience).

## Some stuff you might want to use too

* [react-helmet](https://github.com/nfl/react-helmet)
  for handling pages meta tags (title and meta...)
* [tape](https://github.com/substack/tape)
  for unit tests.

This project has been inspired by
[react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example/)


---

## Contributing

* ⇄ Pull requests and ★ stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests that modifies code must be accompanied with automated tests.
* Run `$ npm test` before making a pull request.

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)
