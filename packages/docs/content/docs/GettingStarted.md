---
title: Getting started
path: getting-started
tags:
  - getting-started
---

## Installation

⚠️ Phenomic require at least
**[Node.js@^4.2.0](http://nodejs.org/) / [npm@^3.0.0](https://www.npmjs.com/) or [yarn@^0.15.1](https://yarnpkg.com/)**.

If needed, we recommend you to use [nvm](https://github.com/creationix/nvm) to manage
different versions of node.

To start a project, in a new folder,
create a ``package.json`` file.

A minimalistic content like this is enough:

```json
{
  "private": true
}
```

Now let's install some dependencies.
The default preset we are going to use will work with React and Webpack.

```console
npm install --save-dev whatwg-fetch
npm install --save-dev react react-dom react-router
npm install --save-dev phenomic phenomic-cli phenomic-preset-default
```

This lines will install you a simple ``fetch()`` polyfill ([for compatibility](http://caniuse.com/#search=fetch))
with React and Phenomic and its [default preset](https://github.com/MoOx/phenomic/tree/master/packages/phenomic-preset-default).

The default preset will allow you to consume Markdown and JSON files as data resources
to generate your website/app.

<details>
<summary>See complete ``package.json``</summary>
(versions might be more recent)

```json
{
  "private": true,
  "devDependencies": {
    "phenomic": "^1.0.0",
    "phenomic-cli": "^1.0.0",
    "phenomic-preset-default": "^1.0.0",
    "react": "^15.0.0",
    "react-dom": "^15.0.0",
    "react-router": "^3.0.0",
    "whatwg-fetch": "^2.0.0"
  }
}
```

</details>

## Configuration

Here we going to tell Phenomic the plugins we want to use via the preset.
To do so, we are going to add a ``phenomic`` section in our ``package.json``

```json
{
  ...
  "phenomic": {
    "presets": [
      "phenomic-preset-default"
    ]
  }
}
```

<details>
<summary>See complete ``package.json``</summary>

```json
{
  "private": true,
  "devDependencies": {
    "phenomic": "^1.0.0",
    "phenomic-cli": "^1.0.0",
    "phenomic-preset-default": "^1.0.0",
    "react": "^15.0.0",
    "react-dom": "^15.0.0",
    "react-router": "^3.0.0",
    "whatwg-fetch": "^2.0.0"
  },
  "phenomic": {
    "presets": [
      "phenomic-preset-default"
    ]
  }
}
```

</details>

## First page

Now we will need to create the entry point of you website/app.
Let's create a file ``App.js``

```js
import "whatwg-fetch"
import React from "react"
import { Router, Route, browserHistory } from "react-router"
import { createApp } from "phenomic-preset-default/lib/client"

const Home = () => (
  <div>
    <p>This is a homepage</p>
  </div>
)

export default createApp(() => (
  <Router history={ browserHistory }>
    <Route path="/" component={ Home } />
  </Router>
))
```

Here we defined a router with one route that will be the homepage.
Let's check this page

## Starting the development server

Phenomic CLI have 2 commands: ``start`` (development server) and ``build`` (to generate static build).

Let's add this commands into some scripts of the ``package.json``

```json
{
  ...
  "scripts": {
    "start": "phenomic start",
    "build": "phenomic build",
  }
}
```

<details>
<summary>See complete ``package.json``</summary>

```json
{
  "private": true,
  "devDependencies": {
    "phenomic": "^1.0.0",
    "phenomic-cli": "^1.0.0",
    "phenomic-preset-default": "^1.0.0",
    "react": "^15.0.0",
    "react-dom": "^15.0.0",
    "react-router": "^3.0.0",
    "whatwg-fetch": "^2.0.0"
  },
  "phenomic": {
    "presets": [
      "phenomic-preset-default"
    ]
  },
  "scripts": {
    "start": "phenomic start",
    "build": "phenomic build",
  }
}
```

</details>

Now we can use ``npm start`` to start the website/app.
Website/app should be accessible via [http://localhost:3333](http://localhost:3333).

## Adding a page from markdown file

One homepage is cool, but we might want to add more content.
Let's create a markdown file in our ``content`` folder.

We are going to put the file in ``content/posts/first-post.md``.

```md
# This is a [Markdown](https://en.wikipedia.org/wiki/Markdown#Example) file

If you are new to Markdown, you might want to check those links:

- [What is Markdown?](http://whatismarkdown.com/)
- [Mastering Markdown, a GitHub guide](https://guides.github.com/features/mastering-markdown/)
- [wikipedia.org/wiki/Markdown](https://en.wikipedia.org/wiki/Markdown#Example)
- [masteringmarkdown.com](http://masteringmarkdown.com/)
```

Note that the folder name is important for you: the first sub-folder is the key
our collection. In our example, the collection generated is ``posts``.

Now let's add a simple route to our ``App.js``

```js
export default createApp(() => (
  <Router history={ browserHistory }>
    <Route path="/" component={ Home } />
    <Route path="/blog/*" component={ BlogPostContainer } collection="posts" />
  </Router>
))
```

We also need to create a ``BlogPostContainer`` component to render the posts.

```js
import { createContainer, query, BodyRenderer } from "phenomic-preset-default/lib/client"

const BlogPost = ({ page }) => (
  <div>
    {page.node && (
      <article>
        <h1>{ page.node.title }</h1>
        <BodyRenderer>{ page.node.body }</BodyRenderer>
      </article>
    )}
  </div>
)

const BlogPostContainer = createContainer(BlogPost, (props) => ({
  page: query({ collection: "posts", id: props.params.splat }),
}))
```

Here we are introducing a key concept of Phenomic: the collection and how to use
those.

In your ``content`` folder, all sub-folders will be _keys_ for your content that
will allow you to sort and retrieve resources.

In our example above, we are doing a ``query`` on the collection ``posts``.
We are using the ``id`` to find a single item.
``id`` is the filename after the sub-folder, in our case ``first-post``
(the .md extension is ignored, and ``stuff/index.md`` being considered as ``stuff``).

### Accessing the markdown page

We just created a route and a component to retrieve the markdown file.
Now we can access our post by accessing directly [http://localhost:3333/blog/first-post/](http://localhost:3333/blog/first-post/).

### Generating list of pages

Accessing directly an url is cool, but only when you know it!
It would be nice to have a list of existing pages (in our case, ``posts``).
So let's add an index on our ``Home``!

For this we will need to wrap our ``Home`` with a container like for ``BlogPosts``.
The difference here is that we are going to make a query the entire collection.

```js
const HomeContainer = createContainer(Home, (props) => ({
  posts: query({ collection: "posts" }),
}))
```

It's easier than before, same ``query``, but without ``id``.

Now we need to change our route to use ``HomeContainer`` instead of ``Home``

```js
export default createApp(() => (
  <Router history={ browserHistory }>
    <Route path="/" component={ HomeContainer } />
    <Route path="/blog/*" component={ BlogPostContainer } collection="posts" />
  </Router>
))
```

Maybe you noticed that we actually didn't use our resources in our ``Home`` component?
Let's display the list of posts with this change

```js
import { Link } from "react-router"

const Home =  ({ posts }) => (
  <div>
    <h1>Home</h1>
    <ul>
      { posts && posts.node && posts.list &&
        posts.node.list.map((post) => (
          <li key={post.id}>
            <Link to={ `/blog/${ post.id }`}>{ post.title || post.id }</Link>
          </li>
        ))
      }
    </ul>
  </div>
)
```

Now your homepage should render a list with your single post.
But wait, the label being used is the ``id``?!
This can be improved by adding meta data into your markdown file.

### The front-matter

At the top of each markdown file, we can a "front-matter" in a section separated by  the 3 dashes ``---``.  
You can store anything you want in there.
It's by default a
[YAML section](https://en.wikipedia.org/wiki/YAML#Sample_document),
but you can use
[other formats like JSON, TOML, JavaScript...](https://www.npmjs.com/package/gray-matter#highlights).

Let's modify our file with a ``title`` property

```md
---
title: "First post"
---

# This is a [Markdown](https://en.wikipedia.org/wiki/Markdown#Example) file

...
```

Now, check out your homepage, you should see the title.
Keep in mind that this front-matter can contains all kind of informations like
date, authors name, tags, image reference etc.
By default some keys are automatically interpreted as way to query your content.
This allows you to query posts for a single author, a specific tag and even order by date.

---

# @TODO
Just to prepare our posts list to accept future posts, let's order the query by date.
We just need to add some parameter

```js
const HomeContainer = createContainer(Home, (props) => ({
  posts: query({ collection: "posts", sortBy: "date" }),
}))
```

---

## Pagination

When you will start having a lot of content, you might want to add a pagination.
From a developer perspective, it very straight forward to enable pagination on
a query.
Let's continue with our list of posts by adding more parameters

```js
export default createContainer(Home, props => ({
  posts: query({ collection: "blog", limit: 5  }),
}))
```

Here we just added a ``limit`` parameter. That's enough to limit the number of
item but won't help to handle next pages.

We decided to solves pagination problem with a single parameter: ``after``.
This parameter is a hash that is pointing to specific place in the collection.

Before adding it in the query, we need to actually create a link to access next page!
Let's add a link in our Home, after our list of posts

```js
  {
    posts.node && posts.node.hasNextPage &&
    <Link to={ `/after/${ posts.node.next }`}>Older posts</Link>
  }
```

This link will look like ``http://localhost:3333/after/MjAxNC0wNS0yMC1zdWR3ZWItMjAxNA==``

We now have to add be able to read it from the router so we can pass it to the query.
So we will add a route in the router:

```js
export default createApp(() => (
  <Router history={ browserHistory }>
    <Route path="/" component={ HomeContainer } />
    <Route path="/after/:after" component={ HomeContainer } />
    <Route path="/blog/*" component={ BlogPostContainer } collection="posts" />
  </Router>
))
```

One more thing is to be done now that we have the url understood by react-router:
we need to tell ``after`` to our query.
Let's modify the query like this:

```js
export default createContainer(Home, props => ({
  posts: query({ collection: "blog", limit: 5, after: props.params.after  }),
}))
```

With this we should now have the url working. And now you have a pagination that
will never die.
What does this mean? Think about this url `/page/2`. If you want to share it, 
content my have changed if new posts are added right? But with our approach,
using a hash, we have url that never changes and that will always return the same
result with the same query. That involves we will generate under the hood all
possible pages, but that's Phenomic job!

---

## Hot loading

You might be interested by hot loading, which allow you to edit your code and
get instant feedback in your browser.
By default, CSS changes will already be instantly hot loaded.
But you might also want to tweak your React components in real time.
In order to do that, you have to edit a little your `App.js`:

Replace this

```js
import { createApp } from "phenomic-preset-default/lib/client"

// ...

export default createApp(() => (
  <Router history={ browserHistory }>
    {/* ... */}
  </Router>
))
```

By the following code:

```js
import { createApp, renderApp } from "phenomic-preset-default/lib/client"

// ...

const routes = () => (
  <Router history={ browserHistory }>
    {/* ... */}
  </Router>
))

export default createApp(routes)

if (module.hot) {
  module.hot.accept(() => renderApp(routes))
}
```

``phenomic-plugin-bundler-webpack`` and ``phenomic-plugin-renderer-react`` have
``react-hot-loader@3.x`` requirements so everything should works like a charm.

---

## Handle pages meta (HTML `<head>`)

The recommended way to manage HTML meta tags
(title, description, links, external scripts/styles, facebook & twitter meta...)
is to use [react-helmet](https://github.com/nfl/react-helmet)
package.

This reusable React component will manage all of your changes to the document head.
It takes plain HTML tags and outputs plain HTML tags.

⚠️ _You can even define `<html>` and `<body>` attributes_.

You can start using ``react-helmet`` directly in any components:

```js
import Head from "react-helmet"

const Home =  ({ posts }) => (
  <div>
    <Head>
      <title>Hello world</title>
      <meta name="description" content="Everything is awesome!" />
    </Head>
    <h1>Home</h1>
    <ul>
      { /* ... */ }
    </ul>
  </div>
)

// ...

const BlogPost = ({ page }) => (
  <div>
    <Head>
      <title>{ page.node.title }</title>
      <meta name="description" content={ page.node.body.slice(0, 150) } />
    </Head>
    {page.node && (
      <article>
        <h1>{ page.node.title }</h1>
        <BodyRenderer>{ page.node.body }</BodyRenderer>
      </article>
    )}
  </div>
)
```

In order to have the injection of meta into your static html files, you will need
a custom html template.

⚠️ _Default ``Html`` component is very rudimentary and be adapted if you care about SEO_.

Here is what you need to add if you want to includes all
``react-helmet`` output:

```js
const Html = (props) => {
  const helmet = Head.renderStatic()
  return (
    <html { ...helmet.htmlAttributes.toComponent() }>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <body { ...helmet.bodyAttributes.toComponent() }>
        { /* phenomic html output */}
        { props.body }
        { /* phenomic current state, as json */}
        { /* required so sync static/client rendering */}
        { props.state }
        { /* phenomic entry script */}
        { props.script }
      </body>
    </html>
  )
}

```

You also need to specify your custom ``Html`` component to ``createApp()`` call:

```diff
-export default createApp(routes)
+export default createApp(routes, Html)
```

Now your static render should include all meta generated by ``react-helmet``

**To know more about all the things you can do with ``react-helmet``,
please read [the documentation](https://github.com/nfl/react-helmet#readme).**


## Handling page not found (404) and unknown URLs

**Because Phenomic will only generated during static build all possible _known_
URLs for _known resources_**, we need to handle the case where URLs requested
does not match any result.

Everytime we use a star (``*``) and (sometimes) a parameter (``:name``) in a
``<Route`` definition,
you will need to handle the case for data requested do not exist.
With our previous example, we will need to add some case in multiple places.

Let's create an component to render the error

```js

const PageError = ({ error }) => {
  const status = error && error.status || 404
  const message = error && status !== 404 ? error.statusText : "Page not found"

  return (
    <View>
      <Head>
        <title>{message}</title>
      </Head>
      <h1>{message}</h1>
    </View>
  )
}
```

Now we need to catch all routes so we need to add a ``*`` after all routes

```js
const routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ HomeContainer } />
    <Route path="/after/:after" component={ HomeContainer } />
    <Route path="/blog/*" component={ BlogPostContainer } collection="posts" />
    <Route path="*" component={PageError} />
  </Router>
)
```

Here it's almost done. We just miss all unknown error under ``/blog/``
that won't be caught by the new route.
So we will need to edit ``BlogPost`` to handle this kind of problem:

```js
const BlogPost = ({ hasError, page }) => {
  if (hasError) {
    return <PageError error={page.error} />
  }

  return (
    <Layout>
    // ...
    </Layout>
  )
}
```


## Building your app as static HTML files

A single command you build your site into a ``dist`` folder

```console
npm run build
```

### Debugging static build

During the static build, you might get some different kind of errors

#### ``Invariant Violation``

```
Invariant Violation: Minified React error #61; visit http://facebook.github.io/react/docs/error-decoder.html?invariant=61 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
```

By default, static build have ``process.env.NODE_ENV`` set to ``production``.
You can just start the static build like this

```console
NODE_ENV=development npm run build
```

#### Debugging Phenomic core

Phenomic use [debug](debug) under the hood, so it's pretty easy to get a very
verbose output in your terminal. You can start or build your project by
prefixing your command with the ``DEBUG`` environment variable set to ``phenomic:*``

```console
NODE_ENV=development DEBUG=phenomic:* npm run build
```

Depending on what you want to view/filter, you can use a more spefic value for ``DEBUG`` (eg: ``DEBUG=phenomic:core:*`).


### Deploying static build

You can deploy this folder to any kind of static hosting.

@todo link to doc

@todo
- json as data
- loading state
- static build
- advanced guide
