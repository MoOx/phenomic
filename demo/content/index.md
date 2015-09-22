---
title: Statinamic
---

> The only "static but dynamic" website generator

## Simple to use

Your database are [Markdown](https://en.wikipedia.org/wiki/Markdown)
files.
Your layouts are JavaScript files.
No pesky template language to learn.
No need for specific plugins.
You can just grab some packages on the [NPM ecosystem](http://npmjs.org/)
to help you building your website, blog or even your small app.

## Static and dynamic?

Generate and deploy a static website take less than a minute. No server/cms
updates required. No hacking possible. It just works™.

The technology
([React](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome)).
used to generate pages can render pages on both client and server
(~~Isomorphic~~ [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9)
rendering).
So when the client has established a connection with your website, he can get
the same UX as an app by grabbing the minimal amount of data for each new page.

## Setup a website in a flash

```console
$ npm install MoOx/statinamic
$ ./node_modules/.bin/statinamic new my-website
$ cd my-website
$ npm start

# Now just wait for you browser to show up :)
```

**[The _new_ command above is not ready yet](https://github.com/MoOx/statinamic/issues/16).**

[Read the documentation](docs/)
