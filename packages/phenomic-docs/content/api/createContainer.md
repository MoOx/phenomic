---
title: createContainer
path: container
tags:
  - react
---

## createContainer(Component, getQueries)

```javascript
export default createContainer(Component, props => ({
  post: query({
    collection: "posts",
    id: props.params[0],
  }),
}))
```

## query(config)

```javascript
query({
  collection: "posts",
  id: "foo",
})

query({
  collection: "posts",
  filter: "tags",
  value: "phenomic",
  limit: 0,
})
```
