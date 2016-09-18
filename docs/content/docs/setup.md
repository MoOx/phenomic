---
title: How to setup Phenomic
---

Phenomic require at least
**[Node.js@^4.2.0](http://nodejs.org/) / [npm@^3.0.0](http://npmjs.com/)**.  
We recommend you to use [nvm](https://github.com/creationix/nvm) to manage
different versions of node.

**A minimal phenomic-theme-base is required, in order to provide you some
flexibility.** But don't worry, a command will set it up for you.

## One command setup

🚀 With those instructions, you should have a new clean project, that will
magically open itself in your browser!

### macOS / Linux

```sh
DIR=your-website-folder && mkdir $DIR && cd $DIR && mkdir node_modules && \
npm i phenomic && ./node_modules/.bin/phenomic setup && npm i && npm start
```

### Windows

```cmd
SET DIR=your-website-folder && mkdir %DIR% && cd %DIR% && mkdir node_modules && ^
npm i phenomic && ./node_modules/.bin/phenomic setup && npm i && npm start
```

If you have questions on "why is the setup command so long", you will find
answer below 😉.

🚀 **When you get the hello world, it's time to take a look to our
[Getting Started](../getting-started/) page and to [start hacking!](../usage/).**


---

## Detailed setup

### Create a new folder

That's an easy step.

```sh
DIR=your-website-folder
mkdir $DIR && cd $DIR
```

### Get Phenomic

You will need to install Phenomic first, to generate the required phenomic-theme-base.
You can install Phenomic from npm to get latest stable version, or install
it from git to get latest bleeding edge updates.

_By installing it locally, you ensure that several projects can rely on
different versions of Phenomic.
Anyway, Phenomic will probably not work installed globally._

```sh
mkdir node_modules
```

*This command is to be sure that phenomic will be installed in the current
folder, otherwise, npm might try to install it in a parent folder until it
finds a ``node_modules`` or a ``package.json``, up to your HOME folder.*

#### Install from npm

```sh
npm install phenomic
```

* ``--save[-dev]`` is useless because there is no ``package.json`` yet.
  This will be be handled by the setup command below.
* You can ignore error about missing ``package.json`` and warnings about
  missing peer dependencies.

#### Install from git

To install from git, you will need to get some deps to transpile sources

```sh
npm install babel-cli babel-preset-react babel-preset-latest babel-preset-stage-1 babel-plugin-flow-react-proptypes
npm install https://github.com/MoOx/phenomic.git
```

### Setup phenomic-theme-base

**Notice:** This step will create (and overwrite) any existing ``package.json``.

```sh
./node_modules/.bin/phenomic setup
```

**⚠️ If you got errors here, please double check that you have required version of
Node and NPM specified at the top of this page.**

After you answer some questions, your project is ready.

_Tip:_ You can open `package.json` and adjust some values to fit your needs.

_Check out [Configuration](../usage/configuration/) for more information about
the configuration options._

### Install dependencies

When you are done the setup, it's time to get all dependencies.

```sh
npm install
```

npm will install some peer dependencies for you; by doing this we ensure that
_you_ control the dependencies that you are using. This way you are totally aware
of what you use and are not locked in to using packages that you don't want to.

Now it's time to...

### Start the engine

```sh
npm start
```

It's that simple.

This command calls the `start` command from the `scripts` section of your
`package.json`.
As you can see this will execute ``phenomic start`` command that will load the
configuration and run the development mode.

Now just wait for your browser to show up (yes this development mode should open
your development server in your favorite browser).

---

🚀 **When you get the hello world, it's time to take a look to our
[Getting Started](../getting-started/) page and to [start hacking!](../usage/).**
