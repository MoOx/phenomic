import deburr from "lodash.deburr"
import kebabCase from "lodash.kebabcase"
import frontMatter from "front-matter"
import marked from "marked"

const debug = require("debug")("phenomic:plugin:transform-markdown")

function transformMarkdownFile(file, contents) {
  debug(`transforming ${ file }`)

  const front = frontMatter(contents)
  const partial = {
    ...front.attributes,
    tags: (front.attributes.tags || []).map(tag => kebabCase(deburr(tag))),
  }
  const data = {
    ...partial,
    body: (
      // @todo replace marked by remark
      marked(
        front.body,
        {
          highlight(code /* , language */) {
            return require("highlight.js").highlightAuto(code).value
          },
        }
      )
    ),
  }
  return {
    data,
    partial,
  }
}

export default function() {
  return {
    name: "phenomic-plugin-transform-markdown",
    type: "transform",
    supportedFileTypes: [ "md", "markdown" ],
    transform: transformMarkdownFile,
  }
}
