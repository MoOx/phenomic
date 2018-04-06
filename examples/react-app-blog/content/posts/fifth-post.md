---
title: "I wrote my fifth post and you won't believe what happen next"
date: "2017-01-05"
layout: light
---

This post is using the `light` layout, defined from markdown front-matter. How
cool?

Another post that have a [link to the first one](../first-post/).

An wrong link to [a post that does not exist](../unknown-post/) and another one
to [a page that does not exist](/unknown-page/).

Here is an [external link](http://phenomic.io).

```md
# Some markdown...

...in a markdown file. **Markdownception?**.
```

```js
import unifiedProcessor from "./unifiedProcessor";
import type { plugin } from "./unifiedProcessor";
import defaultOptions from "./default-options";

// eslint-disable-next-line
const debug = require("debug")("phenomic:plugin:transform-markdown");
```
