// @flow

import * as React from "react";
import { BodyRenderer } from "@phenomic/preset-react-app/lib/client";
import removeExtFromHref from "@phenomic/helpers-transform/lib/removeExtFromHref";

const MarkdownGenerated = (props: Object) => (
  <div className="phenomic-Markdown">
    <BodyRenderer>{removeExtFromHref(props.body)}</BodyRenderer>
  </div>
);

export default MarkdownGenerated;
