---
title: "What is Build failure: ChunkRenderError: No template for dependency: TemplateArgumentDependency?"
---

The issue come from the fact that you have multiple webpack instance running.
This means your project have 2 "webpack" dependencies in ``node_modules``.

To find out, use
```console
npm ls | grep webpack@
```
_or with `yarn`_
```console
yarn ls | grep webpack@
```

If you see 2 webpack dependencies, get in touch with us, it's not a normal
scenario.

Phenomic should not have this installed as it's a dev dependencies.
`npm install phenomic` (or `yarn add phenomic`) should not install dev deps.

How did you install phenomic?
Did you followed [the setup instructions](/docs/setup/)?
