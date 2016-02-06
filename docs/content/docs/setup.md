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

You can also create a empty `package.json` file in it that we are going to fill.

```console
$ touch package.json
[$ [xdg-]open package.json]
```

## Fill the `package.json`

You can copy the following `package.json` content.

**Remember to adjust some values :**
- `name`
- `homepage`
- `statinamic` section

(And before you ask: `npm init` won't really help us in our case).

```json
{
  "private": true,
  "name": "YOUR-NAME-that-might-be-used-in-some-title-tags",
  "homepage": "http://YOUR.HOSTNAME/your-base-url-if-needed/",
  "scripts": {
    "start": "babel-node scripts/build --server --open --dev",
    "build": "babel-node scripts/build --static --production"
  },
  "statinamic": {
    "CNAME": true
  },
  "babel": {
    "presets": [
      "react",
      "es2015",
      "stage-1"
    ],
    "env": {
      "development": {
        "presets": [
          "react-hmre"
        ]
      }
    }
  },
  "eslintConfig": {
    "parser": "babel-eslint",
    "extends": [
      "eslint-config-i-am-meticulous/react"
    ]
  },
  "stylelint": {
    "extends": "stylelint-config-standard"
  }
}
```

_Check out [Configuration](../usage/configuration/) for more information about
the configuration options._

When you got this `package.json` right, you can run the following:

```console
$ npm install --save-dev statinamic
$ cp -R ./node_modules/statinamic/boilerplate/ .
$ ./node_modules/.bin/statinamic setup
```

The setup script should take a moment to install some peer dependencies.
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
