---
title: How to use create your page layouts in Phenomic
incomplete: true
---

Phenomic uses React components as layouts.

By default, Phenomic offers you the following layouts:

- [`Page`](#page)
- [`PageError`](#pageerror)

If you use the ``PageContainer``, you will need those components in
your `layouts` definition (by default, declared in `app/routes.js`).

To use your custom layout, add the `layout` option to the `YAML` frontmatter of
your Markdown file like so:

```yaml
title: Hello World
layout: MyCustomLayoutComponent
```

## `props` sent to layouts

Layouts receive data handled by Phenomic. Here are the props that you can use:

### ``isLoading``

This boolean value tells you when a layout only have partial data
(only the head).
This allows you to display a content placeholder or a spinner while data are
being downloaded.

### ``head``

This object contains data from the front-matter and is always available.
You might find data such as page ``title``, ``date``, ``layout`` or whatever
your files contains.

### ``body``

This data is the body of your files, and is available when content are loaded.
You might only try to display this when ``isLoading`` is false.

### ``__filename``

This string contains the file path of your current resource
(relative to project root)

### ``__url``

This string contains the url of your current resource.

---

## Default page layouts that Phenomic can use

### `Page`

`Page` will be used as the default layout.
**It is required for Phenomic to work by default.**

[Check out the default `Page` and the `props` it has.](https://github.com/MoOx/phenomic/blob/master/themes/phenomic-theme-base/src/layouts/Page/index.js)

### `PageError`

`PageError` will be used as the default layout when a page has an error
(**eg: http 404 not found**).

_This layout is optional_ and a `PageContainer` contains a minimal fallback if
it is not available.

[Check out the default `PageError` and the `props` it has.](https://github.com/MoOx/phenomic/blob/master/themes/phenomic-theme-base/src/layouts/PageError/index.js)

### ``PageLoading``

_This layout is optional and deprecated, prefer handling loading state directly
in your layouts_.

⚠️
If you are using ``PageLoading`` and want to have some custom loading state for
some layouts, you can define ``hasLoadingState`` static value on your layouts
to tell Phenomic to use your layout loading state instead of ``PageLoading``

If you are not satisfied with the default loading layout, feel free
adjust it by grabbing some CSS or SVG spinners/loaders from:

- http://codepen.io/collection/jifIK/4/
- http://projects.lukehaas.me/css-loaders/
- http://tobiasahlin.com/spinkit/
- https://github.com/jlong/css-spinners
- http://codepen.io/collection/HtAne/
- http://iconmonstr.com/?s=loading

Or learn how to make your own:

- http://www.paulund.co.uk/css-loading-spinners
- http://stephanwagner.me/only-css-loading-spinner
