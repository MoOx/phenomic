---
metaTitle: "Phenomic, a static website generator for creating dynamic websites"
title: ""
layout: Homepage
---

> Modern static website generator for creating dynamic websites using React
components.

**Note that _Phenomic_ is under active development**, so do not hesitate to:

- Ask questions on [the support chat](https://gitter.im/MoOx/phenomic),
- [Open an issue](https://github.com/MoOx/phenomic/issues/new)
  when you find a bug (or think you have one).

## Easy to use

Write your content in [Markdown](https://en.wikipedia.org/wiki/Markdown) files.
Implement your design with JavaScript files, using [React](http://facebook.github.io/react/).

**No template language to learn. Just JavaScript** (and JSX if you like it).

You can just grab some packages on the [NPM ecosystem](http://npmjs.org/)
to help you build your website, blog or even a small app.

_Phenomic_ will help you generate and deploy a website in a heartbeat.

## Static and dynamic

[React](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome)
is used to generate pages for both client and server; it's called ~~Isomorphic~~
[Universal rendering](https://medium.com/@mjackson/universal-javascript-4761051b7ae9).

A pre-rendered, *static* version of your website is generated first; then when
a user browses your website, **they can get the same UX as an app by grabbing
the minimal amount of data for each new page**
(a single file that only contains your page data).

<center style="font-weight: bold"><a href="showcase/">Showcase</a></center>

## Setup a website in a flash

Creating a website based on Phenomic only takes a minute.
[Why not give it a try?](docs/setup/)

## Awesome DX (Developer Experience)

During development, enjoy the benefit of hot loading with visual errors in your
layout! That means you won't have to refresh your page during development when
you edit your website. You will also see compilation & runtime errors.

[![Developer experience preview](/assets/dx-play.jpg)](/assets/dx.mp4)

### Choose your Phenomic flavor

Phenomic is easily customizable; choose your own Markdown engine
(with your own plugins), your own CSS preprocessor etc, thanks to the
flexibility of Webpack and its loaders.
