import React from "react";
import { BodyRenderer } from "@phenomic/preset-react-app/lib/client";

require("./index.css");

const MarkdownGenerated = (props: Object) => (
  <div className="Markdown">
    <BodyRenderer>{props.body}</BodyRenderer>
  </div>
);

export default MarkdownGenerated;
