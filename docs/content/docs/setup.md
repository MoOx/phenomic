---
title: How to setup Phenomic
---

Phenomic require at least
[Node.js@^4.2.0](http://nodejs.org/) / [npm@^3.0.0](http://npmjs.com/).

It need a minimal boilerplate, in order to provide you some
flexibility.  
Here is how to setup the boilerplate in a minute.

## Create a new folder

That's an easy step.

```console
$ DIR=your-website-folder
$ mkdir $DIR && cd $DIR
```

## Get Phenomic

You will need to install Phenomic first, to generate the required boilerplate.
You can install Phenomic from npm to get latest stable version, or install
it from git to get latest bleeding edge updates.

_By installing it locally, you ensure that several projects can rely on
different versions of Phenomic.
Anyway, Phenomic will probably not work installed globally._

```console
$ mkdir node_modules
```

_This command is to be sure that phenomic will be installed in the current
folder._

### Install from npm

```console
$ npm install phenomic
```

### Install from git

To install from git, you will need to get some deps to transpile sources

```console
$ npm install babel-cli babel-preset-react babel-preset-es2015 babel-preset-stage-1 babel-plugin-flow-react-proptypes
$ npm install https://github.com/MoOx/phenomic.git
```

## Setup boilerplate

```console
$ ./node_modules/.bin/phenomic setup
```

After you answer some questions, your boilerplate is ready.
_Note that it will create (and overwrite) any existing ``package.json``._

_Tip:_ You can open `package.json` and adjust some values to fit your needs.

_Check out [Configuration](../usage/configuration/) for more information about
the configuration options._

## Install dependencies

When you are done the setup, it's time to get all dependencies.

```console
$ npm install
```

npm will install some peer dependencies for you; by doing this we ensure that
_you_ control the dependencies that you are using. This way you are totally aware
of what you use and are not locked in to using packages that you don't want to.

Now it's time to...

## Start the engine

```console
$ npm start
```

It's that simple.

This command calls the `start` command from the `scripts` section of your
`package.json`.
As you can see this will execute ``phenomic start`` command that will load the
configuration and run the development mode.

Now just wait for your browser to show up (yes this development mode should open
your development server in your favorite browser).

When you get the hello world, you will be able to [start hacking!](../usage/)
