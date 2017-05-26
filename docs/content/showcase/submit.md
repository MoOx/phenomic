---
title: Submit a website/app made with Phenomic to the Showcase
---

To submit your site, you just need to
[create a text file](https://github.com/MoOx/phenomic/new/master/docs/content/showcase/entry/).
🚀 Screenshots will be taken automatically!

You should be able to submit this file as a
[pull request](https://help.github.com/articles/creating-a-pull-request/)
via GitHub interface.

Please name the file as the domain of you website. If your website is in a folder, replace ``/`` by 2 underscores (``__``).

Eg:
- ``http://some.where/`` => ``some.where.md``
- ``https://www.somewhere.else/`` => ``www.somewhere.else.md``
- ``https://www.somewhere.else/right/here`` => ``www.somewhere.else__right__here.md``

For the content of the file, you must use the following format:

```md
---
title: My super title
url: http://url-of-the-website/app
source: https://github.com/url/of-the-source-(optional-if-relevant)
showcaseTags:
  - docs
  - community
  - open-source
  - event
  - blog
  - learning
  - business
  - multi-languages
  - # Choose what you need in that list only! Ask on our chat if you are not sure :)
---

A description and technical detail here (optional)
```
