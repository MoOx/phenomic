---
title: Getting started
path: getting-started
tags:
  - getting-started
---

## Installation

⚠️ Phenomic require at least
**[Node.js@^4.2.0](http://nodejs.org/) / [npm@^3.0.0](https://www.npmjs.com/) or [yarn@^0.15.1](https://yarnpkg.com/)**.
We recommend you to use [nvm](https://github.com/creationix/nvm) to manage
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
          <li>
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

@todo
- json as data
- react-helmet
- loading state
- static build
- advanced guide
