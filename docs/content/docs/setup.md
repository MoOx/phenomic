---
title: How to setup Statinamic
---

Statinamic uses
[Node.js](http://nodejs.org/)/[npm](http://npmjs.com/)
and requires a minimal boilerplate, in order to provide you some
flexibility.  
Here is a quick way to setup the boilerplate in a minute :

## Create a new folder

That's an easy step.

```console
$ DIR=your-website-folder
$ mkdir $DIR && cd $DIR
```

## Setup boilerplate

```console
$ npm init --force
$ npm install statinamic
$ ./node_modules/.bin/statinamic setup
```

After answer some questions, you are setup with **Statinamic**.

Why run `npm init` with `force` option ?
npm needs a valid `package.json` file to work.
We are gonna overwrite this file so `force` option is a good choice.

_Tip:_ You can open `package.json` and adjust some values to fit your needs.

_Check out [Configuration](../usage/configuration/) for more information about
the configuration options._

When you are done. Run

```console
$ npm install
```

npm will install some peer dependencies for you.

Why `peerDependencies`? That's an interesting question so let's discuss about
that: by using `peerDependencies`, we ensure that _you_ control the dependencies
you are using. This way you are totally aware of what you use and are not locked
in any way.
And if you don't want to have to think about this, no big deal, dependencies are
probably already installed as you read this.

Now it's time to...

## START THE engine

```console
$ npm start
```

It's that simple.

This command call the `start` command from the `scripts` section of your
`package.json`.
As you can see this will execute a Node.js script that will load the
configuration (`scripts/build.js`) and run Statinamic in development mode.

Now just wait for you browser to show up (yes this development mode should open
your development server in your favorite browser).

When you get the hello world, you will be able to [start hacking!](../usage/)
