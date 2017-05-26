---
title: PhenomicRenderer
path: renderer
tags:
  - react
---

## PhenomicRenderer

`PhenomicRenderer` is where you declare your routes.

```javascript
// App.js
import { PhenomicRenderer } from "phenomic/client"
import Match from "react-router/Match"

module.exports = (
  <PhenomicRenderer>
    <Match exactly pattern="blog/*" collection="blog" />
  </PhenomicRenderer>
)
```
