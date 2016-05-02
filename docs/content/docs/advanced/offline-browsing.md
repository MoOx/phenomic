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

This is a part of ES2015 specifications, only some modern browsers support it.

- [Learn about Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
- [Service worker browser support from caniuse](http://caniuse.com/#search=service-worker)

**Note: Service workers only run over HTTPS, for security reasons.**
Having modified network requests wide open to man in the middle attacks would
be really bad.

## How to enable offline support

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

  This pattern means that we will download all files but only 1 main `index.html`. We use some magic under the hood to make that file a fallback for all routes.

  Phenomic uses [globby](https://www.npmjs.com/package/globby) for matching files in ``dist`` folder.

  Checkout [globby documentation for more information](https://www.npmjs.com/package/globby)

- `object`: Contains 3 keys. Please be aware that you don't need to define all of 3 keys. They will be defined with their default values.

  - `appcache: boolean = true`: Enable/Disable AppCache seperately
  - `serviceWorker: boolean = true`: Enable/Disable Service Worker seperately
  - `pattern: Array = [ "**", "!**/*.html", "index.html" ]`: Define your own globby pattern. A useful case for this option is when you need to remove images from caching list if your website is quite big. But be careful, double check everything before you apply the change.

Now rebuild your website and you may notice some new files in ``dist`` folder such as  ``manifest.appcache``, ``sw.js``, ``sw-register.js`` depending on the options you provided.

> **NOTE**: Offline support will **not be enabled** in development mode

Congratulation. Your website is now a offline-first application.

## FAQ

### How to enable on demand cache for files that weren't cache on initial load ?

This is the default behavior of the builtin Service Worker logic.
It will cache everything under the same origin on demand.

### Can you provide other useful globby patterns ?

Of course. Here is some useful pattern that covers 90% cases of Phenomic's user.
(along with the default pattern)

- `["index.html", "**.css", "**.js"]`: Only cache css, js files and the main `index.html`.
  Everything else will be cache on demand.
- `["index.html", "**/**.json", "**.css", "**.js"]`: Cache all posts' content with
  css, js files and the main `index.html`. Everything else will be cache on demand.

### How can I provide my own Service Worker logic ?

Sorry, It's not possible at the moment.
An issue is opened at [#399](https://github.com/MoOx/phenomic/issues/399).
If you can, please help us implementing it.

### What happened when both AppCache and Service Worker ?

> If you use AppCache and Service Worker on a page, browsers that don’t support
> SW but do support AppCache will use that, and browsers that support both will
> ignore the AppCache and let Service Worker take over.
> - [from MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Registering_your_worker)
