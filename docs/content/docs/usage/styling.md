---
title: How to style your app/website in Phenomic
incomplete: true
---

## Future-proof & Local CSS

The default boilerplate contains 2 essentials things so you can easily write
CSS:

- [PostCSS](https://github.com/postcss/postcss),
a modular tool that allows you to use future-proof and custom CSS syntax
(by default, [postcss-cssnext](http://cssnext.io/) is enabled so you can use
a lot of new CSS features);
- [CSS modules](https://github.com/css-modules/css-modules),
which allows you to have local CSS classnames in your React components.

At first, you will probably find that not having global CSS is weird.
But the way the web and UI are evolving is clearly by following a component
approach. You should think about UI modules and styles your component one by
one.

If you need some global CSS variables, [you can add some in the JavaScript
configuration](http://cssnext.io/usage/#features).
(but you should not use many of these).

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
