---
title: Introduction
priority: 1
---

Phenomic is a modular website compiler that helps you build static websites
optimised for SEO and UX with a modern approach: you will **make your website
the same way you build an app**.

Phenomic is different from other SSG by allowing you to pick the technologies,
libraries, frameworks of your choice and build your website with it. You can
decide the renderer you want to use (like [React]()), your bundler (like
[Webpack]()) and so on. If the solution you are want is not implemented yet,
**Phenomic accepts plugins** so you can bring your own flavor!

The result of what Phenomic produces for production is pretty simple: **static
files** that you can deploy on any static hosting (HTML, CSS, JavaScript, images
etc). This means the server where you will deploy your website don't require a
runtime. The result served will be **an SEO friendly website** (all pages built
and can be served as HTML files) and **optimised for fast browsing** (after the
first HTML page, JavaScript files will handle client side navigation and only
download what is necessary without full pages reload).

This way you offer the **best user experience** by immediately serving
pre-generated HTML for first visits (or all pages, for search engine bots and
browsers that don't interpret JavaScript) and then using the power of JavaScript
you **avoid full page reload** by only downloading small chunks of data for each
pages & interactions.
