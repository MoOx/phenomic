---
title: How Phenomic works
priority: 2
---

## Phenomic Lifecycle

The lifecycle of Phenomic is pretty light and can be summarized like this:

* Initialisation from [configuration](./configuration.md),
* Bundling of (or two) JavaScript bundles (for [CSR](./faq.md#what-is-csr) &
  [SSR](./faq.md#what-is-ssr)),
* [Content API](./api.md) initialisation from transformed content files
  (optional),
* Rendering via a development server or static rendering as files for
  production.

What's cool about Phenomic is that the entire lifecycle is configurable via
plugins.

---

Relying on [existing plugins](https://phenomic.io/en/plugins/) is a good first
step to get started with Phenomic. Even better, you can directly choose a
[preset](https://phenomic.io/en/tutorials/) to start using it in seconds. And if
you don't find something that fit your needs or just miss something, your can
[make your own plugin](./writing-plugins.md).

## Plugins

Phenomic took inspiration from _metalsmith_ by choosing to have a very light
core highly extensible with plugins.

Plugins can interact at all stage of Phenomic process (during both development
or static generation). A plugin can do multiple things but generally you will
find this 4 types of plugins.

### Renderer plugins

This will handle the generation of the html/dom (static/client side). That's
probably the most important type of plugins. Depending of the renderer plugin
you will choose, this might completely change your experience with Phenomic.

_Example:
[React (@phenomic/plugin-renderer-react)](https://phenomic.io/en/packages/plugin-renderer-react/docs/)_

### Bundler plugins

This will handle the javascript bundles that will be generated for the browser
(and also used for static generation).

_Example:
[Webpack (@phenomic/plugin-bundler-webpack)](https://phenomic.io/en/packages/plugin-bundler-webpack/docs/)_

### Transformer plugins

This will handle the transformation of files found by phenomic. Optional if you
directly hit an existing API.

_Example:
[Markdown (@phenomic/plugin-transformer-markdown)](https://phenomic.io/en/packages/plugin-transform-markdown/docs/)
or
[JSON (@phenomic/plugin-transformer-json)](https://phenomic.io/en/packages/plugin-transform-json/docs/)_\_.

### Other kind of plugins

You will also find some various kind of plugins that can do some other stuffs
like generating an RSS feed from your content files or just serve static files
from a `/public` folder (eg: `robots.txt` and friends).

## Presets

Presets are a collection of plugins. For now we have only one,
[but we want more](https://github.com/phenomic/phenomic/issues?q=is%3Aopen+label%3Aplugin).

That's the fastest way to start with Phenomic. You can directly check out
existing [tutorials](https://phenomic.io/en/tutorials/)
