---
title: Pagination
path: pagination
tags:
  - pagination
---

## How to paginate?

### At route definition

```javascript
<Match pattern="/your/route/:after?" paginated />
```

### In your queries

```javascript
const getQuerys = props => ({
  posts: query({
    collection: "posts",
    limit: 10,
    // you just get the `after` param
    after: props.params.after,
  })
})
```
