import remark from "remark"
import slug from "remark-slug"
import autoLinkHeadings from "remark-autolink-headings"
import highlight from "remark-highlight.js"
import html from "remark-html"
import gemojiToEmoji from "remark-gemoji-to-emoji"

export default (text) => (
  remark
    // https://github.com/wooorm/remark-slug
    .use(slug)

    // https://github.com/ben-eb/remark-autolink-headings
    .use(autoLinkHeadings, {
      attributes: {
        class: "phenomic-HeadingAnchor",
      },
      template: "#",
    })

    // https://github.com/wooorm/remark-html
    .use(html, { entities: "escape" })

    // https://github.com/ben-eb/remark-highlight.js
    .use(highlight)

    // https://github.com/jackycute/remark-gemoji-to-emoji
    .use(gemojiToEmoji)

    // render
    .process(text, {
      commonmark: true,
    })
)
