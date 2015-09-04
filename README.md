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

_The nice part is it can offer the same UX as an app by using small requests for
data (eg: JSON) and allow to easily integrate smooth navigation between pages
(eg: using [bloody-react-transition-child](https://github.com/bloodyowl/react-transition-child))._


## Install

```console
$ npm install MoOx/statinamic
```

## Usage

See [demo](demo) for now.

### What you need to know

You will need to:

* initialize your bundle with your preferences, routes and components
* create your build script so you can
  * define your configuration
    (eg: webpack loaders to add your favorite css preprocessor)
  * run the dev server
  * build for production

For that you will mainly need to:

* write or reuse [React components](http://react-components.com/)
* tweak [webpack configuration](http://webpack.github.io/docs)
  so you can consume images, svg, css or whatever you want.

Check out the [demo source code](demo).

---

## Explanation

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
* [React](https://github.com/facebook/react)
  for writing UI
* [React Router](https://github.com/rackt/react-router)
  for routing
* [Redux](https://github.com/gaearon/redux)
  for handling application state
  (a better [Flux](http://facebook.github.io/flux/)implementation)
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools)
  for awesome DX (developer experience).

## Some packages that might helps

* [React Hot Loader](https://github.com/gaearon/react-hot-loader)
  for live development.
* [react-helmet](https://github.com/nfl/react-helmet)
  for handling pages meta tags (title and meta...)
* [tape](https://github.com/substack/tape)
  for unit tests.

_⚠︎ The packages above are used in the [demo](demo)._

This project has been inspired by
[react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example/)


---

## CONTRIBUTING

* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing unit tests (`$ npm test`).

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)
