---
title: How to write content using Phenomic
incomplete: true
---

You can write your files using any text based language like
[Markdown](https://en.wikipedia.org/wiki/Markdown),
[AsciiDoc](https://en.wikipedia.org/wiki/AsciiDoc),
[Textile](https://en.wikipedia.org/wiki/Textile_(markup_language)),
[Txt2tags](https://en.wikipedia.org/wiki/Txt2tags) or
[LaTeX](https://en.wikipedia.org/wiki/LaTeX).

phenomic-theme-base provides a markdown engine but you can use anything you want.
See [Configuration](../configuration/) to specify your own engine.

One common thing that text files will require is front matter that
contains some metadata about the content.

If you need specific need, check out the [plugins](../plugins/) section of
the documentation.

## Front matter

Here is a review of the important fields you can use.


```yml
---
# title default = undefined
title: "Page title"

# layout default = "Page"
layout: "MyComponent" # name referenced in `src/routes.js`

# route default = normalized path of the markdown file
# eg: content/some/thing.md => /some/thing/(index.html)
route: my-custom-url # will create the file /my-custom-url/(index.html)
# if you provide an extension, the url won't be converted to a folder + index.html
# eg: route: 404.html # will create the file /404.html
# eg: route: something.htm # will create the file /something.htm

# note that you can add others, such as `date` or anything you want/need to
# sort/filter
---

Page content...
```

For the ``title``, note that you can additionally use a ``metaTitle`` field to
specify a alternative ``<title>``.
This allows you to use a ``title`` (``<h1>``?) for the page ``<body>``,
and ``metaTitle`` for the meta ``<title>`` of the page ``<head>``.

**For `layout`, please read the [Layouts](../layouts/) documentation.**

### Front matter format

Currently **front matter can be written using YAML, JSON or TOML** (we rely on
[gray-matter](https://www.npmjs.com/package/gray-matter) that supports all of these
formats out of the box).

You can change the language of your front matter by specifying it after the
first front matter delimiter (eg: ``---``).

```json
---json
{
  "title": "Phenomic is awesome"
}
---
```

## Text format

```yml
---
title: "Page title"
---

Here you **can** use some _markdown_.
```

The default engine supports Markdown, but you can use whatever your want.
_You will need an engine that can transform text to html._

See [Configuration](../configuration/) to specify your own engine.
