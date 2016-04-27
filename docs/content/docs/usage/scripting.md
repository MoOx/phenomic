---
title: How to code things for your app/website with Phenomic
incomplete: true
---

Phenomic is based on JavaScript.
So you can use any [npm](https://www.npmjs.com/) packages you want
or raw JavaScript to code anything you want.

Phenomic is also based on the [React](http://facebook.github.io/react/) library
and ecosystem.
Be sure to check
[how to tackle the React ecosystem](https://github.com/petehunt/react-howto).

## Routing

@todo

## Constants

Several constants are exposed (injected) in your JavaScript code in
``process.env``:

- ``process.env.NODE_ENV``: "production" for production (static) build
- ``process.env.PHENOMIC_USER_PATHNAME``: the base path of your website/app
- ``process.env.PHENOMIC_NAME``: Phenomic pretty name
- ``process.env.PHENOMIC_VERSION``: Phenomic version
- ``process.env.PHENOMIC_HOMEPAGE``: Phenomic homepage url
- ``process.env.PHENOMIC_REPOSITORY``: Phenomic repository url
