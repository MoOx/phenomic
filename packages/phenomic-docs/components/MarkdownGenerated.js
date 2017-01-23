import React from "react"

require("./markdownGenerated.css")

const MarkdownGenerated = (props: Object) => (
  <div
    className="Markdown"
    dangerouslySetInnerHTML={{ __html: props.body }}
  />
)

export default MarkdownGenerated
