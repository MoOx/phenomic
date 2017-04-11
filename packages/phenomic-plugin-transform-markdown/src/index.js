import deburr from "lodash.deburr"
import kebabCase from "lodash.kebabcase"
// $FlowFixMe front-matter going to be replace
import frontMatter from "front-matter"
// $FlowFixMe marked going to be replace
import marked from "marked"

const debug = require("debug")("phenomic:plugin:transform-markdown")

function transformMarkdownFile(file: string, contents: Buffer) {
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
            // $FlowFixMe highlight.js going to be replace
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
    supportedFileTypes: [ "md", "markdown" ],
    transform: transformMarkdownFile,
  }
}
