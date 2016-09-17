---
title: What are the differences with Gatsby?
---

[Gatsby](https://github.com/gatsbyjs/gatsby) is another static website generator
based on React and is older than Phenomic.

_Phenomic has been created at a time where Gatsby had not a single
automated tests and was written in Coffeescript:
it was very hard to contribute._

Here are some points we want to highlight :

- Phenomic will load **pages data on demand only** so it can be used for
  website/app with a lot of pages/screen.
- Phenomic offers **offline browsing via Service Worker**.
- Phenomic tries to have a minimal public API, like React, and is made to be
  flexible to fit your needs and preferences.
  For example:
  - You have control of the entire routing system (react-router) and can
    adjust routes.
  - We try to provide what we think are very good and strong defaults,
    but you should be able to adjust anything easily.
  - You can have whatever files tree you want.
  - You have **full control over your webpack configuration** and don't have to
    use weird or hacky workarounds to adjust it.
- We are focused on providing you an awesome DX (developer experience):
  - Lot's of **clear warnings and errors messages**, like React.
  - **Good and accessible documentation**
  - We respect [SemVer](http://semver.org/) and will always try to provide the
    best release notes we can, as well as deprecation warnings.
  - A [gitter channel](https://gitter.im/MoOx/phenomic) is available,
    so ask any questions you'd like.
- Phenomic uses peer dependencies so **you have total control over the
  dependencies**.
  You will never have to wait to use latest React version if it's compatible
  with your code and Phenomic requirements (eg: React 0.14 or 15.0, you decide).
- Phenomic does not have any "optional" dependencies as a real dependency.
  For example, Gatsby has in it's dependencies LESS, Sass and PostCSS (yeah
  maybe that's too much).
  By default, Phenomic will just install PostCSS (since it's required in the
  phenomic-theme-base), but you can remove it (since it will be added in your
  package.json) and replace with any dependency you want (or none).
- Phenomic is covered by a lot of **automated unit, integration and functional
  tests** to avoid bugs and regressions.

Phenomic is under heavy development.
[Check out contributors and activity graphs](https://github.com/MoOx/phenomic/graphs/contributors)
