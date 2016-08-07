---
title: Phenomic FAQ about Babel
---

## I have a weird warning "[BABEL] Note: The code generator has deoptimised the styling of ..."

_This is not an issue. Just a simple information._

When babel compiles some code it tries to offer readable output, but when files
get large (>100KB), babel considers (by default) that it's not useful to make
the output readable.
If you are annoyed by this message, or if you don't care about readability,
you can just use `compact: true`.
Or `false` if you do.
Only the `"auto"` value (default value) will print this warning.
See [babel options](https://babeljs.io/docs/usage/options/)
for more information.
