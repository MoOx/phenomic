---
title: How to style your app/website in Phenomic
---

## Syntax and Architecture

The phenomic-theme-base allows you to write, by default, stylesheets with two
different approaches:
Global (normal) CSS and/or
[CSS modules](#css-modules).

It also includes
[PostCSS](#postcss)
with
[cssnext](#cssnext)
so you have a built-in modular CSS pre-processor.

> It's very easy to add another pre-processor like Sass or LESS.
> You can look directly in the default ``webpack.config.js`` and look for the
> CSS section. A commented part is waiting for you with lot's of comments so
> you can adjust to your need.

The future-proof syntax / Local CSS is the recommended solution that plays nice
with React.

**Not that the default CSS loaders only apply to ``web_modules`` folder.
If you want to consume CSS from ``node_modules``, you should adjust the
webpack configuration (a commented piece of code should be waiting for you).**

---

### Global CSS

All files that ends with ``.global.css`` will be considered as normal CSS.
This is relevant for reset/normalize, global styles on html and body,
and also for markup you don't control (eg: highlighted code in your markdown).

### CSS Modules

[CSS modules](https://github.com/css-modules/css-modules)
allows you to have generated local CSS classnames in your React components.
This ensure that classnames are local to your components and unique.

> The way the web and UI are evolving is clearly by following a component
> approach.
> You should think about UI modules and styles your component one by one.

If you need some global CSS variables in your modules,
[you can add some by tweaking cssnext configuration](http://cssnext.io/usage/#features)
in the ``postcss`` section of the webpack configuration.

---

### PostCSS

[PostCSS](https://github.com/postcss/postcss)
is a modular tool that allows you to use future-proof and custom CSS syntax
(by default, [postcss-cssnext](http://cssnext.io/) is enabled so you can use
a lot of new CSS features).

### cssnext

[cssnext](http://cssnext.io/)
is a PostCSS plugin that helps you to use the latest CSS syntax today.
It transforms new CSS specs into more compatible CSS so you don't need to wait
for browser support.

**ProTip™**: For your layout, we advise you to use
[Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
whenever you can.

_If you think this brief documentation is not enough, feel free to open an
issue._

### Why not inline styles instead of CSS?

Unfortunately, inline styles don't play well with pre-rendering for now. When
we build the static version, we don't know where the site will be viewed on, so
viewport adjustments can't be done properly and will therefore result in some
visual changes/re-rendering.

You can probably provide a fairly decent user experience with smooth
re-rendering, but it isn't an easy task. However, please feel free to open an
issue to discuss it if you think that this isn't the case!
