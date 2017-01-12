const deburr = require("lodash.deburr")
const kebabCase = require("lodash.kebabcase")
const frontMatter = require("front-matter")
const marked = require("marked")

function transformMarkdownFile(file, contents) {
  const front = frontMatter(contents)
  const partial = {
    ...front.attributes,
    tags: (front.attributes.tags || []).map(tag => kebabCase(deburr(tag))),
  }
  const data = {
    ...partial,
    body: marked(front.body, {
      highlight (code, language) {
        return require('highlight.js').highlightAuto(code).value
      },
    }),
  }
  return {
    data,
    partial,
  }
}

module.exports = function() {
  return {
    supportedFileTypes: [ "md", "markdown" ],
    transform: transformMarkdownFile,
  }
}
