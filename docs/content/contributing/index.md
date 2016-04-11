---
title: "How to contribute to Statinamic"
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
For every modification, please run the entire test suit by using `npm test`.

But when you are working on a specific component, to work faster, just be
focused on what you are interested on.

### Example with PageContainer

If you want to work on ``PageContainer``, look in ``src/PageContainer``.
Tests will be in ``src/PageContainer/__tests__/*``.

To run test for ``PageContainer`` component:

```console
$ ava src/PageContainer/__tests__/*
```
