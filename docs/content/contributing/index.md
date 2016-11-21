---
title: How to contribute to Phenomic
---

## Clone the repository & get dependencies

```
git clone https://github.com/MoOx/phenomic.git
cd phenomic
```

**Note about dependencies:**
We support both [npm](http://npmjs.com/) and [Yarn](http://yarnpkg.com/)
but to make developer experience faster we use yarn by default.
Some scripts use yarn under the hood. To force npm usage, just export this in
your current terminal session:

```console
export PHENOMIC_TEST_WITH_YARN=false
```

## Update the phenomic-theme-base

To work on the phenomic-theme-base, run the following:

```console
npm run phenomic-theme-base-start
```

_or with `yarn`_

```console
yarn run phenomic-theme-base-start
```

Then you can edit files in the `themes/phenomic-theme-base` folder, you should
see change immediately.

## Update the docs

To work on the docs, run the following:

```console
npm run docs-start
```

_or with `yarn`_

```console
yarn run docs-start
```

Then you can edit files in the `docs` folder and you will get changes
immediately.

## Work on the core

- All core files are in `src/`
- Unit tests are located relative to modules (`src/**/__tests__`).
- Integration tests are located at the root of the project (`__tests__/*`).

_After every modification, please run the entire test suite by using
`npm test` (or with `yarn`, using `yarn test`)._

Note that the full test suite can take a few minutes, as it runs unit tests and
end to end tests
(with several builds, including docs and a new project from the phenomic-theme-base).

To speed things up, you can limit tests to the specific component you are working on.

### Example with PageContainer

If you want to work on ``PageContainer``, look in ``src/PageContainer``.
Tests will be in ``src/PageContainer/__tests__/*``.

To run tests for the ``PageContainer`` component:

```console
jest src/PageContainer/__tests__/*
```

When you think you are done with your update, remember to run either `npm test` (or `yarn test`).

Anyway, CI will warn us if something goes wrong.

---

**If you have any question, use the [support chat](https://gitter.im/MoOx/phenomic).**
