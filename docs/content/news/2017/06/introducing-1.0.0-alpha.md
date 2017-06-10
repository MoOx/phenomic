---
data: 2017-06-02
title: Introducing Phenomic 1.0.0 first alpha
---

## A complete rewrite

Phenomic is a static website generator that has been in v0.\* for quite a while now. As we wanted to release a v1, we took some time to think about what needed to change, and what we could do better for our stable API.

A few months ago, we started the reflexion. As our GitHub issues were mainly bikeshedding and user-specific needs, we realised that we were trying to bring too much in our core module, which was preventing us from moving forward to where we wanted to push Phenomic.

We then started prototyping a new version in consideration of what we want it to be capable of:

- Use an HTTP API as content source, which would enable us to build static versions of multiple CMS
- Have a powerful querying API
- Build scalable static web apps
- Handle pagination

Therefore we decided to make a simple core API and put the specifics in plugins. Phenomic for now has a default preset with Webpack and React, but opens the way for any other bundler or UI library (ping us if you'd like to implement Rollup, Vue or Angular).

Today we're officially releasing the first alpha of our 1.0.0 API, and we'd be really grateful for your feedback while we finalise the last details and the docs.

You can have a look on [this website source](https://github.com/phenomic/phenomic/tree/master/docs) and [learn how to get started](/packages/preset-react-app/docs/getting-started/README.md).

We hope you'll like this release!
