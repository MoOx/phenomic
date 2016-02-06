---
title: ""
---

> A static website generator to create dynamic website using React components

**Note that _Statinamic_ is at an early stage**, so do not hesitate to :

- ask question on [the support chat](https://gitter.im/MoOx/statinamic),
- [open an issue](https://github.com/MoOx/statinamic/issues/new)
  when you find a bug (or think you have one).

## Easy to use

Write your content in [Markdown](https://en.wikipedia.org/wiki/Markdown) files.
Implement your design with JavaScript files, using [React](http://facebook.github.io/react/).

**No template language to learn. Just JavaScript** (and JSX if you like it).

You can just grab some packages on the [NPM ecosystem](http://npmjs.org/)
to help you building your website, blog or even your small app.

_Statinamic_ will help you to generate and deploy a generated website in a
breath.

## Static and dynamic

The technology
([React](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome))
used to generate pages can render pages on both client and server.  
That's called ~~Isomorphic~~
[Universal rendering](https://medium.com/@mjackson/universal-javascript-4761051b7ae9).

A pre-rendered version of your website can easily be made as a static version.
When the client has established a connection with your website,
**your users can get the same UX as an app by grabbing the minimal amount of
data for each new page** (a single JSON file).

## Setup a website in a flash

Creating a website based on Statinamic should take a minute.
[Why don't you try it?](docs/setup/)

## Awesome DX (Developer Experience)

During development, enjoy the benefit of hot loading with visual errors in your
layout! That means you won't have to refresh your page during development when
you will edit your pages. You will also see compilation errors and runtime errors.
[Here is a GIF to see what this might looks like](https://cloud.githubusercontent.com/assets/1539088/11611771/ae1a6bd8-9bac-11e5-9206-42447e0fe064.gif).

_For now, you will only need to refresh a page to refresh Markdown content
([but we have an idea to improve that](https://github.com/MoOx/statinamic/issues/11))._

### Choose your Statinamic flavor

The way Statinamic is done helps you to customize everything:
choose your own Markdown engine (with your own plugins), your CSS preprocessor,
etc, thanks to the flexibility of Webpack and its loaders.


## Built with

![React](assets/react.png)

---

<center style="margin: 2rem;">
  <a href="docs/setup/" style="font-size: 2rem; font-weight: 200;">
    Let's try this now!
  </a>
</center>
