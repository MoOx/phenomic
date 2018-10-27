---
priority: 5
title: Content API
subtitle: "What it is, when to use it"
---

Phenomic content API is optional. It only make sense if you use files as your
content input (eg: markdown). As soon as you use it, JSON files will be created
during static rendering. This static JSON files will be used client side
navigation instead of HTML files after the first page viewed.

The optional content API offers additional steps during the process:

- Content files are read from the filesystem (+ watched for change during
  development)
- Those files are transformed as data\*
- The data resulting from the transformation is injected into Phenomic database
  and later accessible via the content API

To access those data, you will use the
[api-client](https://phenomic.io/en/packages/api-client/docs/) but probably not
directly via this module. Renderer plugins might expose wrapper around the
`query` utility (eg:
[`withPhenomicApi` higher order component for react plugin](https://phenomic.io/en/packages/plugin-renderer-react/docs/)).
