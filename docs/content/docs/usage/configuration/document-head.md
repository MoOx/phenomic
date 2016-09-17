---
title: How to configure Phenomic pages metadata?
---

The best way to configure page metadata
(title, description, facebook & twitter meta, external scripts/styles etc) is to
rely on the excellent [React-Helmet](https://github.com/nfl/react-helmet)
package.

## React-Helmet

[React-Helmet](https://github.com/nfl/react-helmet) is the best document head
manager available for React that allows you to manage all of your definitions
and changes to your documents head with support for
_document title, meta, link, script, and base tags._
It's like ``react-document-title`` but on steroids.

The phenomic-theme-base uses ``react-helmet`` in several places
(look for ``<Helmet`` usage).

**To know more about how to use ``react-helmet``, please read
[the documentation](https://github.com/nfl/react-helmet#readme) and
especially
[the use cases section](https://github.com/nfl/react-helmet#use-cases).**
