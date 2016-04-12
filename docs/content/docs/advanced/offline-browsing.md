---
title: Offline browsing
incomplete: true
---

> We live in a disconnected & battery powered world,
> but our technology and best practices are a leftover
> from the always connected & steadily powered past.
>
> [-- OfflineFirst.org](http://offlinefirst.org/)

Imagine that users visit your website for the first time,
all the data will be saved into their device storage and they can view it
on the run without a internet connection.

That's awesome right ? And you know what ?
Phenomic supports offline browsing **out of the box.**

Here is two different technique to enable offline experience for your website:

## AppCache

This is the old one, IE 10 (and above) supports it.

### [Learn about AppCache](http://www.html5rocks.com/en/tutorials/appcache/beginner/)

### [AppCache browser support from caniuse](http://caniuse.com/#search=appcache)

You can config Phenomic to generate a AppCache manifest for you after build.

To enable this feature, add an ``appcache`` field to ``package.json`` under
``statinamic`` section.

```js
{
  ...
  "statinamic": {
    "appcache": true
  }
  ...
}
```

Available values for appcache:

- `false` or `null`: Default value. Disable appcache manifest generation
- `true`: Use default globby patterns `[ "**/*.*", "!**/*.html", "index.html" ]`

  This pattern means that only json files will be downloaded.
  Downloading HTML files too is not useful since appcache will have a
  proper FALLBACK option to redirect all URLs (when offline) to a
  single entry point that will start the client app (which will consume json).
- `array`: Specify your own globby patterns. Be careful, it's all yours.
- `string`: like array, will be converted to array. Ex: `"foo"` --> `["foo"]`

Phenomic uses [globby](https://www.npmjs.com/package/globby) for matching files in
``dist`` folder.

Checkout [globby documentation for more information](https://www.npmjs.com/package/globby)

Now rebuild your website and you will notice a new ``manifest.appcache``
file your ``dist`` folder.

> **NOTE**: AppCache will **not be enabled** in development mode

Congratulation. Your website is now a offline-first application.

## Service worker

Not implemented yet.  [help us](https://github.com/MoOx/statinamic/issues/153)
