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
import PageContainer from "phenomic/lib/PageContainer"

// @todo show usage
```

[Check the usage in the phenomic-theme-base.](https://github.com/MoOx/phenomic/blob/master/docs/src/routes.js)

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
