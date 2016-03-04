---
title: How to style your app/website in Statinamic
incomplete: true
---

## Future-proof & Local CSS

The default boilerplate contains 2 essentials things so you can easily write
CSS:

- [PostCSS](https://github.com/postcss/postcss),
a modular tool that allows you to use future-proof and custom CSS syntax
(by default, [postcss-cssnext](http://cssnext.io/) is enabled so you can use
a lot of new CSS things);
- [CSS modules](https://github.com/css-modules/css-modules),
which allows you to have local CSS classnames in your React components.

At first, you will probably found that not having global CSS is weird.
But the way the web and UI are evolving is clearly by following a component
approach. You should think about UI modules and style your components one by
one.

If you need some global CSS variables, [you can add some in the JavaScript
configuration](http://cssnext.io/usage/#features).
(but you should not use a lot).

**ProTip™**: For you layout, we advice you to use
[Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
whenever you can.

_If you think this brief documentation is not enough, feel free to open an
issue._

### Why not inline styles instead of CSS?

Sadly, inline styles don't play well with pre rendering (at least yet).
When we build the static version, we don't know the device where we are going
to be displayed on, so viewport adjustments can't be done properly and will
result in some visual changes/rerendering.
You can probably provide a "not so bad" UX with a smooth re-rendering, but it's not an easy thing. If you think it easy, feel free to open an
issue to discuss about that!
