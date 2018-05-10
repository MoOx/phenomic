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
  if (typeof node !== "object") return node;
  const newNode = {
    ...node
  };
  if (node.p && node.p.href) {
    // $FlowFixMe stfu
    newNode.p = {
      ...node.p,
      href: callback(node.p.href)
    };
  }
  if (Array.isArray(node.c))
    // $FlowFixMe stfu
    newNode.c = node.c.map((child: Node) => forEachHref(child, callback));
  else if (node.c)
    // $FlowFixMe stfu
    newNode.c = forEachHref(node.c, callback);
  return newNode;
};

const removeExtFromHref = (ext: string = "md") => (href: string) =>
  href.replace(new RegExp(`(\\.${ext})(#.*)?$`), "/$2");

const cleanIndexAndReadme = (href: string) =>
  href.replace(/\/(index|README)(#.*)?\/?$/, "/$2");

const cleanAllHref = (node?: Node, filenameSource: string) => {
  return forEachHref(node, href => {
    const prefix =
      !href.startsWith("/") &&
      !href.startsWith("#") &&
      !href.startsWith("http://") &&
      !href.startsWith("https://") &&
      !(filenameSource === "index.md" || filenameSource === "README.md")
        ? "../"
        : "";
    const h = cleanIndexAndReadme(removeExtFromHref()(href));
    return prefix + h;
  });
};

const MarkdownGenerated = (props: {| body: Node, filename: string |}) => (
  <div className="phenomic-Markdown">
    <BodyRenderer>{cleanAllHref(props.body, props.filename)}</BodyRenderer>
  </div>
);

export default MarkdownGenerated;
