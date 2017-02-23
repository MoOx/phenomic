---
title: How to setup a new project with Phenomic
---

Phenomic require at least
**[Node.js@^4.2.0](http://nodejs.org/) / [npm@^3.0.0](https://www.npmjs.com/) or [yarn@^0.15.1](https://yarnpkg.com/)**.
We recommend you to use [nvm](https://github.com/creationix/nvm) to manage
different versions of node.

**A minimal phenomic-theme-base is required, in order to provide you some
flexibility.** A command will set it up for you.

## Install in a minute

🚀 With those instructions, you should have a new clean project, that will
magically open itself in your browser!

### macOS / Linux

First thing to do is to create a folder with a `node_modules` so we can install
Phenomic locally.  
_Tip: you can edit ``your-website-folder`` in the text box below_.

<!--
we use html just to add contenteditable

```sh
DIR=your-website-folder
mkdir "$DIR" && cd "$DIR" && mkdir node_modules
```

-->

<pre contenteditable="true"><code class="hljs language-sh">DIR=your-website-folder
mkdir "<span class="hljs-variable">$DIR</span>" &amp;&amp; <span class="hljs-built_in">cd</span> "<span class="hljs-variable">$DIR</span>" &amp;&amp; mkdir node_modules</code></pre>

Now we will be at the right place so we can grab Phenomic & launch the setup.
Right after that, we will grab required dependencies & you are good to go!

```sh
npm install phenomic && ./node_modules/.bin/phenomic setup
npm install && npm start
```
_or with `yarn`_

```sh
yarn add phenomic && ./node_modules/.bin/phenomic setup
yarn install && yarn start
```

### Windows

First thing to do is to create a folder with a `node_modules` so we can install
Phenomic locally.  
_Tip: you can edit ``your-website-folder`` in the text box below_.

<!--
we use html just to add contenteditable

```cmd
SET DIR=your-website-folder
mkdir %DIR% && cd %DIR% && mkdir node_modules
```

-->

<pre contenteditable="true"><code class="hljs language-cmd"><span class="hljs-built_in">SET</span> <span class="hljs-built_in">DIR</span>=your-website-folder
<span class="hljs-built_in">mkdir</span> <span class="hljs-variable">%DIR%</span> &amp;&amp; <span class="hljs-built_in">cd</span> <span class="hljs-variable">%DIR%</span> &amp;&amp; <span class="hljs-built_in">mkdir</span> node_modules</code></pre>

Now we will be at the right place so we can grab Phenomic & launch the setup.
Right after that, we will grab required dependencies & you are good to go!
```cmd
npm install phenomic && .\node_modules\.bin\phenomic setup
npm install && npm start
```
_or with `yarn`_

```cmd
yarn add phenomic && .\node_modules\.bin\phenomic setup
yarn install && yarn start
```

🚀 **When you get the hello world, it's time to take a look at our
[Getting Started](../getting-started/) page and to [start hacking!](../usage/).**


---

## Detailed explanation

### Create a new folder

That's an easy step.

```sh
DIR=your-website-folder
mkdir "$DIR" && cd "$DIR"
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

#### Install from npm or yarn
```sh
npm install phenomic
```
_or with `yarn`_
```sh
yarn add phenomic
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
_or with `yarn`_

```sh
yarn add babel-cli babel-preset-react babel-preset-latest babel-preset-stage-1 babel-plugin-flow-react-proptypes
yarn add https://github.com/MoOx/phenomic.git
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
_or if using `yarn`_
```sh
yarn install
```

yarn will install some peer dependencies for you; by doing this we ensure that
_you_ control the dependencies that you are using. This way you are totally aware
of what you use and are not locked in to using packages that you don't want to.

Now it's time to...

### Start the engine
```sh
npm start
```
_or if using `yarn`_
```sh
yarn start
```

It's that simple.

This command calls the `start` command from the `scripts` section of your
`package.json`.
As you can see this will execute ``phenomic start`` command that will load the
configuration and run the development mode.

Now just wait for your browser to show up (yes this development mode should open
your development server in your favorite browser).

---

🚀 **When you get the hello world, it's time to take a look at our
[Getting Started](../getting-started/) page and to [start hacking!](../usage/).**
