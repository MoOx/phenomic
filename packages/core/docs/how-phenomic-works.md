---
title: How Phenomic works
priority: 2
---

The core of Phenomic is pretty light and can be summarized like this:

* [Configuration]() is read from filesystem
* One (or two) JavaScript bundles are generated (for [CSR](../faq/#what-is-csr)
  & [SSR](../faq/#what-is-ssr))\*
* [Content API]() is initialized with transformed\* content files (optional)
* The renderer will do his job to serve (for development) or build static files
  (for production).\*

<small>\* This steps are configurable via plugins.</small>

--- @todo add schema

With this in mind, you can know understand that there is 2 ways to get started
with Phenomic. One way is to directly rely on [existing plugins]() (or a bundle
of plugins (presets)). The other way, if you don't find something that fit your
needs, is to [make your own plugin]().

## Plugins

Phenomic took inspiration from [metalsmith]() by choosing to have a very light
core highly extensible with plugins.

Plugins can interact at all stage of Phenomic process (during both development
or static generation). A plugin can do multiple things but generally you will
find this 4 types of plugins.

### Renderer plugins

This will handle the generation of the html/dom (static/client side). That's
probably the most important type of plugins. Depending of the renderer plugin
you will choose, this might completely change your experience with Phenomic.

_Example: [React (@phenomic/plugin-renderer-react)]()_

### Bundler plugins

This will handle the javascript bundles that will be generated for the browser
(and also used for static generation).

_Example: [Webpack (@phenomic/plugin-bundler-webpack)]()_

### Transformer plugins

This will handle the transformation of files found by phenomic. Optional if you
directly hit an existing API.

_Example: [Markdown (@phenomic/plugin-transformer-markdown)]() or
[JSON (@phenomic/plugin-transformer-json)]()_\_.

### Other kind of plugins

You will also find some various kind of plugins that can do some other stuffs
like generating an RSS feed from your content files or just serve static files
from a `/public` folder (eg: `robots.txt` and friends).

## Presets

Presets are a collection of plugins. For now we have only one,
[but we want more](https://github.com/phenomic/phenomic/issues?q=is%3Aopen+label%3Aplugin).
