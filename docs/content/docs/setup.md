---
title: How to setup Statinamic
---

Statinamic uses
[Node.js](http://nodejs.org/)/[npm](http://npmjs.com/)
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
$ npm install statinamic
$ ./node_modules/.bin/statinamic setup
```

After you answer some questions, you are setup with **Statinamic**.

We use `npm init` with the `force` option because npm needs a valid `package.json`
file to work; as you will overwrite this file anyway, it is a good choice for a
faster setup.

_Tip:_ You can open `package.json` and adjust some values to fit your needs.

_Check out [Configuration](../usage/configuration/) for more information about
the configuration options._

When you are done, run:

```console
$ npm install
```

npm will install some peer dependencies for you; by doing this we ensure that
_you_ control the dependencies that you are using. This way you are totally aware
of what you use and are not locked in to using packages that you don't want to.

Now it's time to...

## START THE engine

```console
$ npm start
```

It's that simple.

This command calls the `start` command from the `scripts` section of your
`package.json`.
As you can see this will execute a Node.js script that will load the
configuration (`scripts/build.js`) and run Statinamic in development mode.

Now just wait for your browser to show up (yes this development mode should open
your development server in your favorite browser).

When you get the hello world, you will be able to [start hacking!](../usage/)
