# statinamic demo

## Install deps

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

## Run dev server

```console
$ npm start
```

## Build for production

```console
$ npm run build:production
```
