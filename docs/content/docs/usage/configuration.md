---
title: How to use configure Statinamic
---

There is not too much to say for now.
You can use the ``package.json`` file to store most static data you want to like
some tracker id (eg: Google Analytics, Disqus...).

This is a documentation for the specific section for Statinamic core.

For now you will just have a commented json

```js
{
  // tell npm that there is a lot of field that you don't need
  // and prevent publishing this folder as a npm package
  "private": true,

  // npm need a 'dashed-name' (optional?)
  "name": "YOUR-NAME-that-might-be-used-in-some-title-tags",

  // statinamic use the default package.json homepage
  // ** it's a required field to adjust url for production build **
  "homepage": "http://YOUR.HOSTNAME/your-base-url-if-needed/",

  // here is the script part, which the ones related to Statinamic
  // you can add more like linting and stuff like that :)
  "scripts": {
    "start": "babel-node scripts/build --server --open --dev",
    "build": "babel-node scripts/build --static --production"
  },

  // Statinamic core section (default values)
  "statinamic": {
    // Where your markdown files are
    "source": "content",

    // Where to put the build files
    "destination": "dist",

    // CNAME file generated from `homepage` hostname in the destination folder
    // use `true` to enable
    "CNAME": false,

    // .nojekyll file to avoid GitHub wasting time to run his default engine
    //   (and at the same time, allow filename prefixed by an `_`)
    "nojekyll": true
  },

  // That's because es5 is not enough, right?
  "babel": {
    //...
  },

  // linting prevent errors
  // See 'Good practices' section.
  "eslintConfig": {
    // ...
  }
}
```
