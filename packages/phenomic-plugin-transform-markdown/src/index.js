import deburr from "lodash.deburr"
import kebabCase from "lodash.kebabcase"
import frontMatter from "front-matter"
import marked from "marked"

function transformMarkdownFile(file, contents) {
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
    supportedFileTypes: [ "md", "markdown" ],
    transform: transformMarkdownFile,
  }
}
