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

There are two different technique to enable offline experience for your website:

## AppCache

This is the old one, IE 10 (and above) supports it.

- [Learn about AppCache](http://www.html5rocks.com/en/tutorials/appcache/beginner/)

- [AppCache browser support from caniuse](http://caniuse.com/#search=appcache)

## Service Worker

This is a part of ES2015 specifications , only modern browsers support it.

- [Learn about Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)

- [Service worker browser support from caniuse](http://caniuse.com/#search=service-worker)

## How to use

To enable this feature, add an ``offline`` field to ``package.json`` under
``phenomic`` section.

```js
{
  ...
  "phenomic": {
    "offline": true
  }
  ...
}
```

Available values for `offline`:

- `false`: Default value. Disable `offline` support.
- `true`: Use default globby patterns `[ "**", "!**/*.html", "index.html" ]`

  This pattern means that only json files will be downloaded.
  Downloading HTML files too is not useful since we only needs a single file HTML serves as a fallback for all routes.

  Phenomic uses [globby](https://www.npmjs.com/package/globby) for matching files in
  ``dist`` folder.

  Checkout [globby documentation for more information](https://www.npmjs.com/package/globby)

- `object`: Contains 3 keys. Please aware that you don't need to define all of 3 keys. They will be defined with their default values.

  - `appcache: boolean = true`: Enable/Disable AppCache seperately
  - `serviceWorker: boolean = true`: Enable/Disable Service Worker seperately
  - `pattern: Array = [ "**", "!**/*.html", "index.html" ]`: Define your own globby pattern. A useful case for this option is when you need to remove images from caching list if your website is quite big. But be careful, double check everything before you apply the change.

Now rebuild your website and you will notice some new files such as  ``manifest.appcache``, ``sw.js``, ``sw-register.js``
file your ``dist`` folder.

> **NOTE**: Offline support will **not be enabled** in development mode

Congratulation. Your website is now a offline-first application.
