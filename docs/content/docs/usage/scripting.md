---
title: How to code things for your app/website with Phenomic
incomplete: true
---

Phenomic is based on JavaScript.
So you can use any [npm](https://www.npmjs.com/) packages you want
or raw JavaScript to code anything you want.

Phenomic is also based on the [React](http://facebook.github.io/react/) library
and ecosystem.
Be sure to check
[how to tackle the React ecosystem](https://github.com/petehunt/react-howto).

## Constants

Several constants are exposed (injected) in your JavaScript code in
``process.env``:

- ``process.env.NODE_ENV``: "production" for production (static) build
- ``process.env.PHENOMIC_USER_PATHNAME``: the base path of your website/app
- ``process.env.PHENOMIC_USER_URL``: your website homepage url (`package.json/homepage` field)
- ``process.env.PHENOMIC_NAME``: Phenomic pretty name
- ``process.env.PHENOMIC_VERSION``: Phenomic version
- ``process.env.PHENOMIC_HOMEPAGE``: Phenomic homepage url
- ``process.env.PHENOMIC_REPOSITORY``: Phenomic repository url

## Available modules

@todo document all public modules

### Components

#### ``PageContainer``

Component to define and declare all pages layouts.

```js
``import { PageContainer } from "phenomic"``

// @todo show usage
```

[Check the usage in the phenomic-theme-base.](https://github.com/MoOx/phenomic/blob/master/docs/src/routes.js)

#### ``Link``

With Phenomic, a user can request a page **with or without** a trailing `index.html`.

If you are using `react-router` `<Link />` component with the `activeClassName`
property,
[React will warn about a difference from client & static rendering](/docs/faq/react/).

Phenomic provides a Link component to cover this case.

**Note that ``Link`` can also be used for unknow links (internal or external).**
Current ``react-router`` ``Link`` implementation just crash if you use an
external link. Phenomic ``Link`` component fix this for you.
This is especially handy if you generate links from unknown data
(eg: markdow front-matter value that can point to internal or external pages).

⚠️ One caveat is you can’t use ``<Link>`` to point to a path **before
the current project base path**. This is probably and edge case, more than using
``<Link>`` for project related and collection links.

#### ``BodyContainer``

This component should be used to wrap pages ``body``.

```js
import { BodyContainer } from "phenomic"

// ...
// in this example, Page is used as a layout
// and declared in a PageContainer usage
class Page extends Component {

  // ...

  render() {
    const { props } = this
    const { body } = props
    // ...
    return (
      <div>
        /* ... */
        <BodyContainer>{ body }</BodyContainer>
        /* === <BodyContainer>{ this.props.body }</BodyContainer> *
        /* ... */
      </div>
    )
  }
}
```

[Check the usage in the phenomic-theme-base.](https://github.com/MoOx/phenomic/blob/master/themes/phenomic-theme-base/src/layouts/Page/index.js)

### Utilities

### ``joinUri``

Simple utility to join uri parts. Ensure that there is no missing or duplicate
slashes.

```js
import { joinUri } from "phenomic"

joinUri("some", "thing") // "some/thing"
joinUri("some", "/thing") // "some/thing"
joinUri("some/", "/thing") // "some/thing"
joinUri("some", "thing", "else"), // "some/thing/else"
joinUri("https://this/", "/one/", "/thing/"), // "https://this/one/thing/"
```
