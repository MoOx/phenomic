import React from "react";
import { BodyRenderer } from "phenomic-preset-default/lib/client";

require("./markdownGenerated.css");

const MarkdownGenerated = (props: Object) => (
  <div className="Markdown">
    <BodyRenderer>{props.body}</BodyRenderer>
  </div>
);

export default MarkdownGenerated;
