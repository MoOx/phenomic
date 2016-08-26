---
title: Writing and consuming plugins for Phenomic
---

For now, Phenomic supports plugins via the ``phenomicLoader``.

You can easily do almost anything you want with a plugin to affect a file
consumed by the ``phenomicLoader``.

A plugin is just a function that accepts some parameters and that must return
a modified collection item that will be added to the collection.

The idea is to work on this kind of object:

```js
{
  // front-matter data
  head: {
    title: "Phenomic Is Using React, You'll Never Guess What Happened Next!",
    date: "2016-12-31",
    clickbait: true,
  },
  // content of the file below the front-matter
  body: "React means the website is not static, but dynamic! Blah blah [...]",
}
```

Plugin might be used to transform the content depending on its format(
[Markdown](https://en.wikipedia.org/wiki/Markdown),
[AsciiDoc](https://en.wikipedia.org/wiki/AsciiDoc),
[Textile](https://en.wikipedia.org/wiki/Textile_(markup_language)).
[Txt2tags](https://en.wikipedia.org/wiki/Txt2tags)
[LaTeX](https://en.wikipedia.org/wiki/LaTeX).)

See the last section to know how to write a plugin (spoiler: it's easy).

## Existing Plugins

For now, plugins are accessible in ``phenomicLoaderPlugins`` in ``phenomic``.

```js
import { phenomicLoaderPlugins } from "phenomic"

phenomicLoaderPlugins.[camelCasedNameOfThePlugin]
// eg: phenomic-loader-plugin-init-body-property-from-content
// will be accessible under
// phenomicLoaderPlugins.initBodyPropertyFromContent
```

*This might change if phenomic is split into multiple packages.*
See [#598](https://github.com/MoOx/phenomic/issues/598) for more informations.

### ``phenomic-loader-plugin-init-body-property-from-content``

This plugin initializes the ``body`` property from data retrieved in the file.
It takes the content of the input that is below the front-matter.

*For now accessible via ``phenomicLoaderPlugins.initBodyPropertyFromContent``.*

### ``phenomic-loader-plugin-init-head-property-from-config``

This plugin initializes in the ``head`` property from ``defaultConfig`` in the
webpack ``phenomic`` configuration section.
It won't override existing key/values in the ``head`` if there is any.

*For now accessible via ``phenomicLoaderPlugins.initHeadPropertyFromConfig``.*

### ``phenomic-loader-plugin-init-head-property-from-content``

This plugin initializes in the ``head`` property from data retrieved in the file.
It takes the front-matter of the input and map it as key => value.

*For now accessible via ``phenomicLoaderPlugins.initHeadPropertyFromContent``.*

### ``phenomic-loader-plugin-init-raw-property-from-content``

This plugin initializes in a ``raw`` property.
This property contains the entire file as raw data.
Useful if you front-end need to handle the content of the file.

*For now accessible via ``phenomicLoaderPlugins.initRawPropertyFromContent``.*

### ``phenomic-loader-plugin-init-rawBody-property-from-content``

This plugin initializes in a ``rawBody`` property.
This property contains the content of the file that is below the front-matter,
as raw data.
Useful if you front-end need to handle the content of the file.

*For now accessible via ``phenomicLoaderPlugins.initRawBodyPropertyFromContent``.*

### ``phenomic-loader-plugin-markdown-init-head.description-property-from-content``

This plugin initializes a ``description`` property in the ``head``, based on the
content accessible below the front-matter.
This plugin assumes your content is markdown and will try to strip the markdown
in order to offer raw text, handy for meta description, content preview etc.
By default will strip to 140 characters (but it won't cut into the middle of a word).
You can pass options to ``phenomic`` section in webpack configuration.

```
{
  pruneLength: 140, // max length of the description
  pruneString: "…", // string to append after the description
}
```

*For now accessible via ``phenomicLoaderPlugins.markdownInitHeadDescriptionPropertyFromContent``.*

### ``phenomic-loader-plugin-markdown-transform-body-property-to-html``

This plugin will transform the ``body`` property into html.
This plugin will assumes your content is markdown and will use
[``remark``](http://remark.js.org/) with
[some plugins](https://github.com/MoOx/phenomic/blob/master/src/phenomic-loader-plugin-markdown-transform-body-property-to-html/index.js) for the transformation.

*For now accessible via ``phenomicLoaderPlugins.markdownTransformBodyPropertyToHtml``.*


## Presets

A preset is just an array of plugins. It's handy to share a collection of
plugins.
To use a preset, just spread it into the ``plugins`` options:

```js
// ..
    plugins: [
      ...myPreset,
      anotherPlugin,
    ]
```

⚠️ If you don't know what spread operator is (``...``), you can see it as a way
to concat to arrays.
You can write this as ``plugins: myPreset.concat(anotherPlugin)`` but this
notation is more verbose, especially if you have multiple plugins.

## Existing presets

Phenomic provides the following presets:

### ``phenomic-loader-preset-default``

- ``phenomic-loader-plugin-init-head-property-from-config``
- ``phenomic-loader-plugin-init-head-property-from-content``
- ``phenomic-loader-plugin-init-body-property-from-content``

🛠 This preset is kind of the phenomic default requirement.
Use it if you want to use classic files with a front-matter and any text format.
**Feel free to take a look to markdown preset to implement your own engine!**

### ``phenomic-loader-preset-markdown``

- ``phenomic-loader-preset-default``
- ``phenomic-loader-plugin-markdown-init-head.description-property-from-content``
- ``phenomic-loader-plugin-markdown-transform-body-property-to-html``

❤️ This preset is the one used by default in Phenomic. It allows you to consume
common markdown files that have a front-matter out of the box.

## Consuming plugins

Let say you want to use something else than the default markdown transformation.

You can use some plugins, but not the one that will transform the markdown as
HTML.

```js
import { phenomicLoader, phenomicLoaderPresets } from "phenomic"
// or if you want to use some each plugins manually
// import { phenomicLoader, phenomicLoaderPlugins } from "phenomic"

// ...

  module: {
   loaders: [
     {
       test: /\.md$/,
       loader: phenomicLoader,
       query: {
          context: path.join(config.cwd, config.source),

          plugins: [
            // here are the unopininated default plugins
            ...phenomicLoaderPresets.default,

            // Instead of specifing via the preset, you can cherry pick some,
            // phenomicLoaderPlugins.initHeadPropertyFromConfig,
            // phenomicLoaderPlugins.initHeadPropertyFromContent,
            // phenomicLoaderPlugins.initBodyPropertyFromContent,

            // ...phenomicLoaderPresets.markdown
            // The commented preset above is part of the default renderer.
            // You can also cherry pick on plugin or the other
            // phenomicLoaderPlugins.markdownInitHeadDescriptionPropertyFromContent,
            // phenomicLoaderPlugins.transformMdBodyPropertyToHtml,

            // here is an example of another transformation
            ({ result }) => {
              return {
                ...result,
                body: doYourThing(result.body),

                // doYourThing() can be any transformation you want.
                // Per previous plugins, ``body`` will contain the raw input
                // passed to the loader, with the front-matter removed.
                // Feel free to take a look to the plugins source before,
                // it's very short !
                // https://github.com/MoOx/phenomic/blob/master/src/
              }
            }
          ]
       },
     },
  ...
```

## Writing plugins

A plugin is just a function that accepts the following parameters:

```
({
  frontMatter: GrayMatterResult,
  result: PhenomicCollectionItem,
  options: PhenomicLoaderOptions,
}) => PhenomicCollectionItem
```

▶️ ``frontMatter`` is the result of the parsing of the file via
[``gray-matter`` package](https://www.npmjs.com/package/gray-matter)
and is an object:

```js
{
  orig: string, // original content (the file)
  data: Object, // key => value of the front-matter content
  content: string, // the raw content below the front-matter
}
```

▶️ ``result`` is a Phenomic collection item.
In the first plugin it just an empty object,
but at the end of the plugin pipeline it should offer the following object

```js
{
  head: Object, // key => value of the front-matter content
  body: string, // html that will be injected in Phenomic ``<BodyContainer>``

  // Keys below are reserved for Phenomic (and added after the plugins execution)

  // ⚠️ Note that the following keys are added by the phenomicLoader itself
  // you cannot affect those values.
  __filename: string, // original relative filename (eg: usage/plugins.md)
  __url: string, // short uri (eg: usage/plugins/)
  __resourceUrl: string, // long uri (eg: usage/plugins/index.html)
  __dataUrl: string, // data uri (for optimized navigation, eg: usage/plugins.{hash}.json)
}
```

▶️ ``options`` are the options of the current loader definition.

It's a merge of webpack ``phenomicLoader`` query options &
``phenomic.phenomicLoader`` section of your webpack configuration.


**The plugin must return an `result` item,
that will be added to Phenomic collection.**  
You can add any key you want,
just be sure to provide the ``head`` object and the ``body``.

### Example of a plugin

The plugin below is a plugin that transform the ``body``
(in this case, set before in another plugin).

```js
const transformMdBodyPropertyToHTML = ({ result }) => {
  return {
    ...result, // spread the entire result
    // and override the body property by applying a transformation
    body: doYourThingToHTML(result.body),
  }
}
```

⚠️ If you want to see some examples for plugins, take a look to

https://github.com/MoOx/phenomic/blob/master/src/
