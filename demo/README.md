# statinamic demo

## Install

_To make this demo works properly, you first need to install dependencies of
the project itself (statinamic), in the folder above this one (statinamic/demo).
[Why should I do that?](node_modules/README.md)._

```console
$ git clone https://github.com/MoOx/statinamic.git
$ npm install
$ cd demo
$ npm install
```

## Usage

### Run dev server

```console
$ npm start
```

### Build for production

```console
$ npm run static
```

### Build static version and start dev server

This is handy to check that the universal magic is working (i.e.: React static
rendering is correct + the client side can work with it).

```console
$ npm run static+start
```

---

## Styles

We recommend you to use:
- [CSS modules](https://github.com/css-modules/css-modules)
  (via css-loader)
- [PostCSS](https://github.com/postcss/postcss)
  (for things like cssnext & autoprefixer).

### Why not inline styles ?

Sadly, inline styles don't play well with pre rendering.
When we build the static version, we don't know the device where we are going
to be displayed on, so viewport adjustments can't be done properly.
