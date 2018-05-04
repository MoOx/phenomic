// @flow

import * as React from "react";
import { BodyRenderer } from "@phenomic/preset-react-app/lib/client";

type Node =
  | string
  | {|
      t?: string,
      p?: Object,
      c?: Node | $ReadOnlyArray<Node>
    |};

const forEachHref = (node?: Node, callback: string => string) => {
  if (!node) return;
  if (node.p && node.p.href) {
    // $FlowFixMe stfu
    node.p.href = callback(node.p.href);
  }
  if (Array.isArray(node.c))
    // $FlowFixMe stfu
    node.c.map((child: Node) => forEachHref(child, callback));
  else
    // $FlowFixMe stfu
    forEachHref(node.c, callback);

  return node;
};

const removeExtFromHref = (ext: string = "md") => (href: string) =>
  href.replace(new RegExp(`\\.${ext}$`), "/");

const cleanIndexAndReadme = (href: string) =>
  href.replace(/\/(index|README)\/?$/, "/");

const removeDocsInPath = (href: string) =>
  href.replace(/\/docs\//, "/").replace(/^docs\//, "./");

const cleanAllHref = (node?: Node) =>
  forEachHref(node, href =>
    removeDocsInPath(cleanIndexAndReadme(removeExtFromHref()(href)))
  );

const MarkdownGenerated = (props: Object) => (
  <div className="phenomic-Markdown">
    <BodyRenderer>{cleanAllHref(props.body)}</BodyRenderer>
  </div>
);

export default MarkdownGenerated;
