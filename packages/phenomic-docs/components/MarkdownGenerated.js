import React from "react"

require("./markdownGenerated.css")

const MarkdownGenerated = (props) => (
  <div
    className="Markdown"
    dangerouslySetInnerHTML={{ __html: props.body }}
  />
)

export default MarkdownGenerated
