---
title: How to setup Phenomic
---

Phenomic uses
[Node.js >= 4.2.0](http://nodejs.org/)/[npm](http://npmjs.com/)
and requires a minimal boilerplate, in order to provide you some
flexibility.  
Here is a quick way to setup the boilerplate in a minute:

## Create a new folder

That's an easy step.

```console
$ DIR=your-website-folder
$ mkdir $DIR && cd $DIR
```

## Setup boilerplate

```console
$ npm init --force
$ npm install phenomic
$ ./node_modules/.bin/phenomic setup
```

After you answer some questions, you are setup with **Phenomic**.

We use `npm init` with the `force` option because npm needs a valid `package.json`
file to work; as you will overwrite this file anyway, it is a good choice for a
faster setup.

_Tip:_ You can open `package.json` and adjust some values to fit your needs.

_Check out [Configuration](../usage/configuration/) for more information about
the configuration options._

### Install from git

To install from git, you will need to get some deps to transpile sources

```console
$ npm install babel-cli babel-preset-react babel-preset-es2015 babel-preset-stage-1 babel-plugin-flow-react-proptypes
$ npm install https://github.com/MoOx/phenomic.git
```

## Install dependencies

When you are done the setup, it's time to get all dependencies.

```console
$ npm install
```

npm will install some peer dependencies for you; by doing this we ensure that
_you_ control the dependencies that you are using. This way you are totally aware
of what you use and are not locked in to using packages that you don't want to.

Now it's time to...

## START the engine

```console
$ npm start
```

It's that simple.

This command calls the `start` command from the `scripts` section of your
`package.json`.
As you can see this will execute a Node.js script that will load the
configuration (`scripts/build.js`) and run Phenomic in development mode.

Now just wait for your browser to show up (yes this development mode should open
your development server in your favorite browser).

When you get the hello world, you will be able to [start hacking!](../usage/)
