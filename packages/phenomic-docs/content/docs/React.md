---
title: React
draft: true
---

```javascript
const BlogPost = (props: Object) => (
  <div />
)

// Here, you define what data is required to display this route
module.exports = createContainer(BlogPost, props => {
  post: query({
    collection: "blog",
    id: props.params.splat,
  }),
})
```

```javascript
// each field you query is passed as an edge, containing the current status of
// the node, and the node itself when ready
const BlogPost = (props: Object) => (
  <div>
    {props.post.status === "loading" &&
      <Spinner />
    }
    {props.post.status === "error" &&
      <ErrorComponent />
    }
    {props.post.status === "idle" &&
      <div>
        <h1>{props.post.node.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: props.post.node.body }}
        />
      </div>
    }
  </div>
)

// Here, you define what data is required to display this route
module.exports = createContainer(BlogPost, props => {
  post: query({
    collection: "blog",
    id: props.params.splat,
  }),
})
```

```javascript
const router = (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/blog" component={Blog} />
    <Route path="/blog/*" component={BlogPost} collection="blog" />
    <Route path="*" component={Page} collection="pages" />
    <Route path="404.html" component={Error404} />
  </Router>
)
```

See the `collection` prop? This let us know on which collection to iterate in order to generate your pages.
