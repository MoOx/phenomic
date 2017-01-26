---
title: Getting started with Phenomic
---

🚀 **Be sure to start with the [setup instructions](../setup/)**.

When everything is ready and the hello world is in front of you,
you may want to add some content and work on the website/app look 'n feel.

## Table of Contents

Let's start with some content.

## How to add a new page in Phenomic?

It's pretty simple, you can just create a new ``my-super-page.md`` file in your ``content`` folder
(``.md`` extension is for Markdown, default supported format by Phenomic -
but it's easy to [add more format (or replace it)](../usage/plugins/)).

Then add into it some content:

```md
---
title: My super new page
---

My super **content**!
```

This file is composed of two sections:

### The front-matter

The first part (between the 3 dashes ``---``) contains page metadata.  
You can store anything you want.
It's by default a
[YAML section](https://en.wikipedia.org/wiki/YAML#Sample_document),
but you can use
[other formats like JSON, TOML, JavaScript...](https://www.npmjs.com/package/gray-matter#highlights).

### The body

The body is the part below the 3 dashes ``---``.  
By default [Markdown](https://en.wikipedia.org/wiki/Markdown#Example) is supported but
[you can easily add whatever format you want](../usage/plugins/).

If you are new to Markdown, you might want to check those links:

- [What is Markdown?](http://whatismarkdown.com/)
- [Mastering Markdown, a GitHub guide](https://guides.github.com/features/mastering-markdown/)
- [wikipedia.org/wiki/Markdown](https://en.wikipedia.org/wiki/Markdown#Example)
- [masteringmarkdown.com](http://masteringmarkdown.com/)

## Where can I find my new page?

By default, the url to access your new created file will be a simple mapping
without ``.md`` extension and clean url without extensions.

**Examples**:

- ``content/index.md`` => ``/``
- ``content/some-page.md`` => ``/some-page/``
- ``content/another-page/index.md`` => ``/another-page/``
- ``content/another-page/yet-another.md`` => ``/another-page/yet-another/``

In our current example, you should have your new page accessible at
[http://localhost:3333/my-super-page/](http://localhost:3333/my-super-page/)

### But I want a custom url!

No problem, you can still add a ``route`` field in the front-matter like this:

```md
---
title: My super new page
route: my-super-url.html
---

My super **content**!
```

Then your content will be accessible at
[http://localhost:3333/my-super-url.html](http://localhost:3333/my-super-url.html)

---

⚠️ **If you need more complex page,
[you can directly rely on a React component and specify your route in the app router](../usage/routing/)**.

---

Assuming you are happy with your new page, let's adjust the page layout.

## How can I adjust templates/layouts?

Now we are going to play with the most interesting strength of Phenomic:
you will use [React](https://facebook.github.io/react) for layouts and all UI
components!

### Wait a minute. _I am new to React, where should I start?_

If you need to start with React you might want to check the following resources:

- [Official "Getting started" with React](https://facebook.github.io/react/docs/getting-started.html)
- [Official React Tutorial](https://facebook.github.io/react/docs/tutorial.html)
- [React Fundamentals on EggHead.io](https://egghead.io/courses/react-fundamentals)
- [reactforbeginners.com](https://ReactForBeginners.com/friend/MOOX)
- [Build your first real world React.js application](http://academy.plot.ly/#react)

You might also take a look at
[react-howto](https://github.com/petehunt/react-howto) to understand what you might need to learn and what you don't.

Also learning ES6/ES2015+ is recommended.
It's the latest version of JavaScript. Here are some links:

- ["Learn ES2015" on Babel documentation](https://babeljs.io/docs/learn-es2015/)
- [es6.io](https://ES6.io/friend/MOOX)
- [Posts about ES6/2015 on _Putain de Code !_](http://putaindecode.io/en/articles/js/es2015/)

## Back to the layout. How can I change my page layout?

Easy. There 2 parts you can adjust that are referenced in the app routes:

### ``src/AppContainer.js``

It's the global website wrapper.
It contains the header, the content and the footer of your website/app.

### ``src/layouts/*``

Here is the place where you should find and add all page layouts.
The page we just created use the default page layout, which is (by default)
``Page`` so we will need to adjust ``src/layouts/Page``.

**Layouts are just React components**, so you should be able to do anything
you want!

## How can I use a custom layout for my page?

We will need to create a new component and references it in some places.

First you need to tell Phenomic that you added a layout.
So you need to register your layout in ``src/routes.js`` in the ``PhenomicPageContainer`` usage.

```js
import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import Homepage from "./layouts/Homepage"
import Post from "./layouts/Post"
// ↓ Add your layout here
import MySuperLayout from "./layouts/MySuperLayout"

      // ...

      <PhenomicPageContainer
        { ...props }
        layouts={ {
          Page,
          PageError,
          Homepage,
          Post,
          MySuperLayout, // ← Add your layout here
        } }
      />
```

After that you can reference your new layout in your markdown file front-matter.

```md
---
title: My super new page
route: my-super-url.html
layout: MySuperLayout # ← Add your layout here
---

My super **content**!
```

For the content of the layout, you can take an existing layout and adjust it
to your need. Keep in mind that you can just consume another layout in your
new layout to avoid repetition! Those are just components!

## Any tips to help me build my layouts?

We are going to implement a simple feature so you can tweak your website.

Besides being able to add an image in the markdown itself, it's possible to
add one in the post metadata to use it later in your layouts.

```md
---
title: My super new page
route: my-super-url.html
layout: MySuperLayout
featuredImage: someImageUrl.png # ← Add your image here
---

My super **content**!
```

---

⚠️ It is possible to add any information in the front-matter, and you might be
able to do almost anything you can think of, even add an images gallery!

---

The front-matter data are sent as `props` in your layouts, and is
available under `props.head`.
This allows you to manipulate it normally using JavaScript.

Supposing you want to use your ``featuredImage`` in a list of pages or posts (``PagesList`` in the default theme)
you will have to change your ``PagePreview`` to make use of that since ``PagesList`` just render a series of ``PagePreview`` components.

Changing the ``PagePreview`` component will change how the "latest posts" are rendered on your homepage.

---

⚠️ The `Homepage` layout filters the latest posts by `Post` layout. If you don't
see your new page in this list, either change your new page to have the `Post`
layout, or edit the homepage collections filter to include your custom layout
by checking out the [How to use Collections](https://phenomic.io/docs/usage/collections/) page.

---

```js
const PagePreview = ({ __url, title, date , featuredImage }) => {
  return (
    <div>
      <img src={ featuredImage } />
      // ...
    </div>
  )
}
PagePreview.propTypes = {
  __url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  featuredImage: PropTypes.string
}

```

Notice how the ``featuredImage`` was added to the ``propTypes`` (for validation), and a parameter ``featuredImage`` was added on the arguments list (the [destructured](http://putaindecode.io/en/articles/js/es2015/destructuring/) ``props``).

This simple way is a good example on how to can access any metadata that you can
add in your front-matter. With that in mind, you now know how to manipulate
and display custom data in React component render functions.

## What can I reuse to build my website quickly?

Keep in mind that React components are like Lego blocks.

Here are some interesting tools or libraries you should know about:

- [html-to-react-components](https://github.com/roman01la/html-to-react-components), a tool to build React components from HTML code,
- [rebass](http://jxnblk.com/rebass/), a set of Configurable React Stateless Functional UI Components,
- [reflexbox](http://jxnblk.com/reflexbox/), a Responsive React flexbox grid system higher order component,
- [React Toolbox](http://react-toolbox.com/#/) a set of React components implementing Google Material Design,
- [A list of some Open Source React Component Libraries](http://davidwells.io/19-open-source-react-component-libraries-to-use-in-your-next-project/)

_Feel free to edit this page to add more resources._

## What is the best way to edit my styles?

Here is a short explanation on what you can do by default.

- `src/**/*.css` files can be imported in React Component since they are
  loaded via [CSS modules](https://github.com/css-modules/css-modules).
  This basically means you can't have conflict with class names.
- `src/**/*.global.css` files are normal global CSS files, handy to define rules
  for html/body and for third party code (eg: a code highlight theme).

By default files are processed via
[PostCSS](https://github.com/postcss/postcss) with [cssnext](http://cssnext.io/)
but you can adjust `webpack.config.js` file to support anything you want.

---

⚠️ We have a
[dedicated section for styling components](../usage/styling/),
why don't you take a look?

---

### How to add variables for my CSS when using PostCSS/cssnext/CSS Modules?

If you want to share some variables in your CSS or CSS modules,
you can rely on cssnext support of CSS custom properties to do so
([limited to :root](https://github.com/postcss/postcss-custom-properties#readme)):

The more effcient way to have global variables is add to some values in cssnext
configuration `customProperties.variables` entry in `webpack.config.js` :

```js
require("postcss-cssnext")({
  browsers: "last 2 versions",
  features: {
    customProperties: {
      variables: {
        successColor: 'green',
        errorColor: 'red'
      }
      // note that instead of an object, you can add here a js files
      // variables: require("./variables.js")
      // where you do
      // modules.export = { key: "value" }
    }
  }
})
```

Now simply use the variable in your CSS :

```css
.buttonSuccess {
  color: var(--successColor);
}
```

### How to add Sass or LESS support?

If you really want to add Sass or LESS for you styles you can replace in your
`webpack.config.js` `postcss-loader` by `sass-loader` or `less-loader`:

- Install dependencies through `yarn` or `npm`
  - `npm install node-sass sass-loader` or `npm install less less-loader`
  - `yarn add node-sass sass-loader` or `yarn add less less-loader`
- Adjust `webpack.config.js` configuration for .css
  - duplicate css section and replace `.css` by `.sass` (or `.less`)
  - or directly replace `.css` by `.sass` (or `.less`).

---

💬 [If you have more questions, be sure to ask on our community chat!](https://gitter.im/MoOx/phenomic)

---

🤗 Now have fun!

**Take a look at the [rest of the documentation](../usage/) where you will
find more details on everything about Phenomic and how to use it**.
