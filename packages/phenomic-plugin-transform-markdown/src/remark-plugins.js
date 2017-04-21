// https://github.com/wooorm/remark
import remark from "remark"
// https://github.com/wooorm/remark-slug
import slug from "remark-slug"
// https://github.com/ben-eb/remark-autolink-headings
import autoLinkHeadings from "remark-autolink-headings"
// https://github.com/wooorm/remark-toc
import toc from "remark-toc"
// https://github.com/mapbox/remark-react
import reactRenderer from "remark-react"
// https://github.com/bebraw/remark-react-lowlight
import RemarkLowlight from "remark-react-lowlight"
// for code highlight
import merge from "deepmerge"
import sanitizeGhSchema from "hast-util-sanitize/lib/github.json"

import languages from "./common-languages.js"

export default (body: string) =>
  remark()
    .use(slug)
    .use(autoLinkHeadings, {
      // @todo find how to make this options works with remark-react
      content: {
        type: "text",
        value: "#",
      },
      linkProperties: {
        className: "phenomic-HeadingAnchor",
      },
    })
    .use(toc)
    .use(reactRenderer, {
      sanitize: merge(sanitizeGhSchema, {
        // remove user-content from github.json to remark-slug work as expected
        clobberPrefix: "",
        // allow code to have className
        attributes: {
          code: ["className"],
          a: ["className"],
        },
      }),
      remarkReactComponents: {
        code: RemarkLowlight(languages),
      },
    })
    // render
    .processSync(body, {
      commonmark: true,
    })
