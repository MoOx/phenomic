---
title: "How to contribute to Phenomic"
---

## Update the boilerplate

To work on the boilerplate, run the following:

```console
$ npm run boilerplate-start
```

## Update the docs

To work on the docs, run the following:

```console
$ npm run docs-start
```

## Work on the core

Every core files are in `src/`. Tests are located relative to modules.

_After every modification, please run the entire test suit by using `npm test`._
Note that the full test suit can take a few minutes, as it run unit tests and
integration tests (with several builds, including docs and a new project from
the default boilerplate).

When you are working on a specific component, to work faster, you can keep your
focus on what you are interested on.

### Example with PageContainer

If you want to work on ``PageContainer``, look in ``src/PageContainer``.
Tests will be in ``src/PageContainer/__tests__/*``.

To run test for ``PageContainer`` component:

```console
$ ava src/PageContainer/__tests__/*
```

When you think you are done with your update, remember to run `$ npm test`.
Anyway, CI will warn us if something goes wrong.
