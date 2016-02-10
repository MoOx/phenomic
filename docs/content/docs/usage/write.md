---
title: How to write content using Statinamic
incomplete: true
---

You can write your files using
[Markdown](https://en.wikipedia.org/wiki/Markdown).

## Header

There is only 2 important fields: `title` and `layout`.


```md
---
# title default = undefined
title: "Page title"
# layout default = "Page"
layout: "MyComponent" # name referenced in `web_modules/layouts/index.js`

# note that you can add more like `date` or anything you want/need to sort/filter
---

...
```

For the ``title``, note that you can additionally use a ``metaTitle`` field to
specify a alternative ``<title>``.
This allow you to have a use a ``title`` (``<h1>``?) for the page ``<body>``,
and ``metaTitle`` for the meta ``<title>`` of the page ``<head>``.

**For `layout`, please read [Layouts](../layouts/) documentation.**

## Content

```md
---
title: "Page title"
---

Here you **can** use some _markdown_.
```

TODO make it clear on the prefered way to use link (relative? absolute?).
