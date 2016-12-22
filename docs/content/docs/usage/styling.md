---
title: How to style your app/website in Phenomic
---

You are free to use whatever solutions you want:
raw CSS,
CSS preprocessors,
[CSS Modules](https://github.com/css-modules/css-modules),
[CSS in JS or inline styles](https://github.com/MicheleBertoli/css-in-js).

Below you will find some details about most popular solutions.

## Recommended syntax and architecture

The ``phenomic-theme-base`` allows you to write, by default, stylesheets with
two different approaches:
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

**Note that the default CSS loaders only apply to ``src`` folder.
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

---

### Inline styles / CSS in JS

#### CSS in JS

While there are [severals solutions](https://github.com/MicheleBertoli/css-in-js)
out there, some are more popular.
[Glamor](https://github.com/threepointone/glamor/)
and
[Aphrodite](https://github.com/Khan/aphrodite)
should work out of the box.
Static rendering step will take that into account and will pre-render styles
for you. Nothing to setup.
It’s even injecting all requirements if you want to rehydrate on startup (in ``window._glamor`` or ``window._aphrodite``).

An optional (but recommended) step is to enable re-hydration.
You will need to add some code in your ``scripts/phenomic.browser.js``
and adjust the code depending on the library you use.

##### Glamor

You need to adjust your ``scripts/phenomic.browser.js``

```js
// ...

import { rehydrate } from "glamor"

if (window._glamor) {
  rehydrate(window._glamor)
}

phenomicClient({ /* ... */ })
```

[See glamor server documentation](https://github.com/threepointone/glamor/blob/master/docs/server.md)

##### Aphrodite

You need to adjust your ``scripts/phenomic.browser.js``

```js
// ...

import { StyleSheet } from "aphrodite"

if (window._aphrodite) {
  StyleSheet.rehydrate(window._aphrodite)
}

phenomicClient({ /* ... */ })
```

[See aphrodite server documentation](https://github.com/Khan/aphrodite#server-side-rendering)

##### styled-components

styled-components doesn't work out-of-the-box with Phenomic (_yet_) but a manual workaround is available. Start by creating ``src/components/ServerSideStyles.js``:

```js
// src/components/ServerSideStyles.js
import React, { PropTypes } from "react"
import Helmet from "react-helmet"
import styleSheet from "styled-components/lib/models/StyleSheet"

const ServerSideStyles = () => {
  const styles = styleSheet.rules().map(rule => rule.cssText).join("\n")

  return (
    typeof window !== "undefined" 
    ? null
    : <Helmet 
        style={ [ 
          { type: "text/css", cssText: styles }
         ] }
      />
  )
}

export default ServerSideStyles
```

The code above imports the stylesheet that styled-components uses internally, extracts all the CSS rules from it, and injects those rules into the head using Helmet when rendering server-side. 

Next, edit ``src/AppContainer.js``:

```js
// src/AppContainer.js
import ServerSideStyles from "./components/ServerSideStyles"
// ...
const AppContainer = (props) => (
  <Container>
    <DefaultHeadMeta />
    <Header />
    <Content>
      { props.children }
    </Content>
    <Footer />
    <ServerSideStyles />
  </Container>
)
```

The changes above import our ``<ServerSideStyles />`` component and add it as the _last_ component inside ``Container``. You're all set.

_NOTE: ``<ServerSideStyles />`` **must** be the last component in your component heirarchy so that it captures all the styles in the component tree._

#### A note on pure inline styles

Unfortunately, pure inline styles don't play well with pre-rendering for now.
When we build the static version, we don't know what devices the site will be
viewed on,
so viewport adjustments can't be done properly and will therefore result in some
visual changes/re-rendering.
That's because pure inline styles don't have media queries.

You can probably provide a fairly decent user experience with smooth
re-rendering, but it isn't an easy task. However, please feel free to open an
issue to discuss it if you think that this isn't the case!
