---
title: What are the differences with Gatsby?
---

[Gatsby](https://github.com/gatsbyjs/gatsby) is another static website generator
based on React, older than Phenomic.

_Phenomic has been created at a time where Gatsby had not a single
automated test and was written in Coffeescript:
it was very hard to contribute._

Here are some points we want to highlight :

- Phenomic is covered by a lot of automated unit, integration and functionals
  tests, to avoid bugs and regressions.
- Phenomic can be used for website/app with a lot of pages/screen: by default
  pages data are loaded on demand and can offer an offline experience via
  Service Worker.
- Phenomic tries to have a minimal public API, like React and is made to be
  flexible to fit your needs and preferences.
  For example:
  - You have the control of the entire routing system (react-router) and can
    adjust routes.
  - We try to provide what we think are very good and strong default,
    but you should be able to adjust anything easily.
  - You can have whatever files tree you want.
  - You have full control over your webpack configuration and don't have to
    use weird or hacky workaround to adjust it.
- We are focused on providing you an awesome DX (developer experience):
  - Lot's of clear warnings and errors messages, like React can offer,
  - Good and accessible documentation
  - We respect [SemVer](http://semver.org/) and will always try to provide the
    best release notes we can, as well as deprecation warnings.
  - A [gitter channel](https://gitter.im/MoOx/phenomic) is accessible for you
    so you can ask any question.
- Phenomic use peer dependencies so you have a total control over the
  dependencies.
  You will never have to wait to use latest React version if it's compatible
  with your code and Phenomic requirements (eg: React 0.14 or 15.0, you decide).

Phenomic is under heavy development.
[Check out contributors and activity graphs](https://github.com/MoOx/phenomic/graphs/contributors)
