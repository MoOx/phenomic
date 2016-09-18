// @flow

import remark from "remark"
import slug from "remark-slug"
import autoLinkHeadings from "remark-autolink-headings"
import highlight from "remark-highlight.js"
import toc from "remark-toc"
import html from "remark-html"

function mdify(text) {
  return remark()
    // https://github.com/wooorm/remark-slug
    .use(slug)

    // https://github.com/ben-eb/remark-autolink-headings
    .use(autoLinkHeadings, {
      content: {
        type: "text",
        value: "#",
      },
      linkProperties: {
        className: "phenomic-HeadingAnchor",
      },
    })

    // https://github.com/wooorm/remark-html
    .use(html, { entities: "escape" })

    // https://github.com/ben-eb/remark-highlight.js
    .use(highlight)

    // https://github.com/wooorm/remark-toc
    .use(toc)

    // render
    .process(text, {
      commonmark: true,
    })
    .toString()
}

export default (
  {
    result,
  }: PhenomicLoaderPluginInput
): PhenomicCollectionItem => {
  return {
    ...result,
    body: mdify(result.body),
  }
}
