---
title: Leveraging Phenomic routing capabilities
---

Phenomic uses [react-router](https://github.com/reactjs/react-router).
By default Phenomic uses a single wildcard route
(all requested urls are send to the ``PageContainer``)
in order to render files consumed by Phenomic.

But by exploiting ``react-router`` capabilities, we do more cool things like
generating pages for each metadata Phenomic can find in your files.

A classic example will be to generate one page per `tag` find in your files.
Let's say you have in your files metadata a ``tags`` field like in this example

```md
---
title: My static website is not static anymore
tags:      # What about generating pages like /tag/* to list your content ?
  - static
  - blog
  - react
---

Now that I use Phenomic, my website is so dynamic!
This is crazy stuff blah blah [...]
```

As you can see, we have a list of tags (but again, that can be other data).
Phenomic automatically find all possibles data in your metadata and allows you
to use those to define new routes via ``react-router``.

⚠️ _For now, Phenomic can handle strings and numbers values,
as well as Array of strings and numbers._

You can for example adjust ``web_modules/app/routes.js``
(default location of the file containing routes)
to add routes to list files related to your tags:

```js
// ...

export default (
  <Route component={ LayoutContainer }>
    <Route path="tag/:tag" component={ ContainerThatWillListPostByTag } />
    <Route path="*" component={ PageContainer } />
  </Route>
)
```

Obviously, you will need to define ``ContainerThatWillListPostByTag``
(and find a better name for it) and
[handle the logic for filtering the collection results](../collections/).

⚠️ **You might noticed that Phenomic will correctly map ``tags`` in routes as
``:tag``.**

The magic rules are simple (first rules applied first):

- `*ies` → ``*y``
- ``*s`` → ``*``

Some examples (metadata key -> route key):

- ``category`` → ``:category``
- ``categories`` → ``:category``
- ``tag`` → ``:tag``
- ``tags`` → ``:tag``
- ``author`` → ``:author``
- ``authors`` → ``:author``
- and so on...

Here is an example on a website that [implemented some tags and authors pages](https://github.com/putaindecode/putaindecode.io/commit/092a040)

⚠️ _Pagination is not supported yet, but it's on Phenomic roadmap._
