---
priority: 5
title: Content API
subtitle: "What it is, when to use it"
---

Phenomic Content API is optional. It only make sense if you use files as your
content input (eg: markdown). As soon as you use it, JSON files will be created
during static rendering. This static JSON files will be used client side
navigation instead of HTML files after the first page viewed.

The optional Phenomic Content API offers additional steps during the process

* Content files are read from the filesystem (+ watched for change during
  development)
* Those files are transformed as data\*
* The data resulting from the transformation is injected into Phenomic DB and
  later acessible via Phenomic Content API

**WIP**
