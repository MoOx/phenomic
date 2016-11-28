---
title: Generate dynamic pages by leveraging Phenomic routing capabilities
---

Phenomic uses [react-router](https://github.com/reactjs/react-router).
By default Phenomic uses a single wildcard route
(all requested urls are send to the ``PageContainer``)
in order to render files consumed by Phenomic.

But by exploiting ``react-router`` capabilities, we do more cool things like
generating dynamic pages for each metadata Phenomic can find in your files.

## Add a React component as a page

You can edit ``src/routes.js`` (default location of the file containing routes)
to add a route to reference your component:

```js

import HomePage from "./pages/Homepage"

// ...

export default (
  <Route component={ AppContainer }>
    <Route path="/" component={ HomePage } />
    <Route path="*" component={ PageContainer } />
  </Route>
)
```

This example is pretty simple, but hopefully, you can do more complex things!

## Uses React-router routes parameters to create dynamic pages

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

You can for example adjust ``src/routes.js``
(default location of the file containing routes)
to add routes to list files related to your tags:

```js
// ...

export default (
  <Route component={ AppContainer }>
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

## Handling Redirection

Phenomic static build does not yet handle react-router redirects so if you are making `onEnter` redirection call make sure to wrap with `typeof window !== 'undefined'` check

```js
// Won't build
import React from 'react'
import { Route } from 'react-router'
import Index from './Index'
import Layouts from './layouts'
import Login from './components/Login'
import AuthService from './utils/AuthService'

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__)
const requireAuth = (nextState, replace) => {
    console.log(auth)
    if (!auth.loggedIn()) {
      replace({ pathname: '/login' }) // Does redirect and will break static build
    }
  }
}

export default (
  <Route component={Index} auth={auth}>
    <Route path='/protected' component={Login} onEnter={requireAuth} auth={auth} />
    <Route path='*' component={Layouts} />
  </Route>
)

```

Fix and wrap onEnter with `typeof window !== 'undefined'`

```js
// Will build. Yay!
import React from 'react'
import { Route } from 'react-router'
import Index from './Index'
import Layouts from './layouts'
import Login from './components/Login'
import AuthService from './utils/AuthService'

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__)
const isClient = typeof window !== 'undefined'
let requireAuth = null // set to null for static build only

if (isClient) {
 requireAuth = (nextState, replace) => {
    console.log(auth)
    if (!auth.loggedIn()) {
      replace({ pathname: '/login' })
    }
  }
}

export default (
  <Route component={Index} auth={auth}>
    <Route path='/protected' component={Login} onEnter={requireAuth} auth={auth} />
    <Route path='*' component={Layouts} />
  </Route>
)
```

## Manipulating history

To create basics links, you need to use the `Link` component from phenomic:

```js

import {Link} from "phenomic"

const Nav = () => (
  <div>
    // ...
    <Link to="/">
      {"Homepage"}
    </Link>
    // ...
  </div>
)
```

But maybe you need to manipulate history outside of `Link` context.

If you already use `react-router` you may know [browserHistory](https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md).

Phenomic injects its own `browserHistory` instance as a `react-router` props.
So instead of using `react-router` `browserHistory` directly, you should use the object exported by phenomic.

```js

import {browserHistory} from "phenomic/lib/client"

class Nav extends Component {
  constructor() {
    super()
    this.handleRedirect = this.handleRedirect.bind(this)
  }

  handleRedirectHome() {
    browserHistory.push("/")
  }

  render() {
    return (
      <div>
        // ...
        <span onClick={this.handleRedirectHome}>
          {"Home"}
        <span>
        // ...
      </div>
    )
  }
}
```
