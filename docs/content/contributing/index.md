---
title: How to contribute to Phenomic
---

## Update the boilerplate

To work on the boilerplate, run the following:

```console
$ npm run boilerplate-start
```

Then you can edit files in the `boilerplate` folder.

## Update the docs

To work on the docs, run the following:

```console
$ npm run docs-start
```

Then you can edit files in the `docs` folder.

## Work on the core

- All core files are in `src/`
- Unit tests are located relative to modules (`src/**/__tests__`).
- Integration tests are located at the root of the project (`__tests__/*`).

_After every modification, please run the entire test suite by using
`$ npm test`._

Note that the full test suite can take a few minutes, as it runs unit tests and
integration tests (with several builds, including docs and a new project from
the default boilerplate).

To speed things up, you can limit tests to the specific component you are working on.

### Example with PageContainer

If you want to work on ``PageContainer``, look in ``src/PageContainer``.
Tests will be in ``src/PageContainer/__tests__/*``.

To run tests for the ``PageContainer`` component:

```console
$ ava src/PageContainer/__tests__/*
```

When you think you are done with your update, remember to run `$ npm test`.
Anyway, CI will warn us if something goes wrong.

---

**If you have any question, use the [support chat](https://gitter.im/MoOx/phenomic).**
