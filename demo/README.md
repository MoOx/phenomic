# statinamic demo

## Install / Commands

```console
$ npm run hackinstall
$ npm install
```

**Note about `hackinstall`**

This command is used because the demo is using a package on a level before
itself, so resolution of dependencies is subject to problems with react &
webpack that doesn't like duplicate modules on different levels.

_This only related to this particular setup and is not necessary in a normal
setup._

### Run dev server

```console
$ npm start
```

### Build for production

```console
$ npm run build
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
