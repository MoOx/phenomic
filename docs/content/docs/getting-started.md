---
title: Getting started with Phenomic
---

🚀 **Be sure to start with the [setup instructions](../setup/)**.

When everything is ready and the hello world is in front of you,
you may want to add some content and work on the website/app look 'n feel.

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

My super **content** !
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

My super **content** !
```

Then your content will be accessible at
[http://localhost:3333/my-super-page.html](http://localhost:3333/my-super-page.html)

Now it's time to adjust the page layout.

## How can I adjust templates/layouts?

Now we are going to play with the most interesting strength of Phenomic:
you will use [React](https://facebook.github.io/react) for layouts and all UI
components!

### Wait a minute. _I am new to React, where should I start?_

If you need to start with React you might want to check the following resources:

- [Official "Getting started" with React](https://facebook.github.io/react/docs/getting-started.html)
- [Official React Tutorial](https://facebook.github.io/react/docs/tutorial.html)
- [React Fundamentals on EggHead.io](https://egghead.io/courses/react-fundamentals)
- [reactforbeginners.com](https://reactforbeginners.com/)

You might also take a look to
[react-howto](https://github.com/petehunt/react-howto) to understand what you might need to learn and what you don't.

Also learning ES6/ES2015+ is recommended.
It's the latest version of JavaScript. Here are some links:

- ["Learn ES2015" on Babel documentation](https://babeljs.io/docs/learn-es2015/)
- [es6.io](http://es6.io/)

## Back to the layout. How can I change my page layout?

Easy. There 2 parts you can adjust that are referenced in the app routes:

### ``src/web_modules/LayoutContainer``

It's the global website wrapper.
It contains the header, the content and the footer of your website/app.

### ``src/web_modules/layouts/*``

Here is the place where you should find and add all page layouts.
The page we just created use the default page layout, which is (by default)
``Page`` so we will need to adjust ``src/web_modules/layouts/Page``.

**Layouts are just React components**, so you should be able to do anything
you want!

## How can I use a custom layout for my page?

We will need to create a new component and references it in some places.

First you need to tell Phenomic that you added a layout.
So you need to register your layout in ``src/app/routes.js`` in the ``PhenomicPageContainer`` usage.

```js
import Page from "../layouts/Page"
import PageError from "../layouts/PageError"
import PageLoading from "../layouts/PageLoading"
import Homepage from "../layouts/Homepage"
import Post from "../layouts/Post"
// ↓ Add your layout here
import MySuperLayout from "../layouts/MySuperLayout"

      // ...

      <PhenomicPageContainer
        { ...props }
        layouts={ {
          Page,
          PageError,
          PageLoading,
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

My super **content** !
```

For the content of the layout, you can take an existing layout and adjust it
to your need. Keep in mind that you can just consume another layout in your
new layout to avoid repetition! Those are just components!

## Any tips to help me build my layouts?

Sure! Keep in mind that those are just React components.
Here are some interesting tools or libraries you should know about:

- [html-to-react-components](https://github.com/roman01la/html-to-react-components), a tool to build React components from HTML code,
- [rebass](http://jxnblk.com/rebass/), a set of Configurable React Stateless Functional UI Components,
- [reflexbox](http://jxnblk.com/reflexbox/), a Responsive React flexbox grid system higher order component,
- [React Toolbox](http://react-toolbox.com/#/) a set of React components implementing Google Material Design,
- [A list of some Open Source React Component Libraries](http://davidwells.io/19-open-source-react-component-libraries-to-use-in-your-next-project/)

_Feel free to edit this page to add more resources._

## What is the best way to add my CSS?

We have a
[dedicated section for styling components](../usage/styling/),
why don't you take a look?

---

🤗 Now have fun!

**Take a look to the [rest of the documentation](../usage/) where you will
find more details on everything about Phenomic and how to use it**.

💬 [And if you have more questions, be sure to ask on our community chat!](https://gitter.im/MoOx/phenomic)
