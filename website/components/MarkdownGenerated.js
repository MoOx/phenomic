// @flow

import * as React from "react";
import { BodyRenderer } from "@phenomic/preset-react-app/lib/client";

import MarkdownHeading from "./MarkdownHeading";

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

const removeExtFromHref = (ext: string = "md|json") => (href: string) =>
  href.replace(new RegExp(`(\\.${ext})(#.*)?$`), "/$2");

const cleanIndexAndReadme = (href: string) =>
  href.replace(/\/(index|README)(#.*)?\/?$/, "/$2");

const replaceOriginalHostnameWithLocal = (href: string) =>
  href.replace(
    process.env.PHENOMIC_APP_BASEURL, // replace production http://realdomain/
    process.env.PHENOMIC_APP_BASENAME // by / so hardcoded link works locally
  );

const cleanAllHref = (node?: Node, filenameSource: string) => {
  return forEachHref(node, href => {
    // prefix is to adjust local (relative) links that are links from docs
    // that will work on github, but won't here
    // eg: a.md links to './b.md'. Since a.md is a/, .b.md needs to become ../b/
    // (note that the .md cleanup is done)
    const prefix =
      !href.startsWith("/") &&
      !href.startsWith("#") &&
      !href.startsWith("http://") &&
      !href.startsWith("https://") &&
      !(filenameSource === "index.md" || filenameSource === "README.md")
        ? "../"
        : "";
    const h = replaceOriginalHostnameWithLocal(
      cleanIndexAndReadme(removeExtFromHref()(href))
    );
    return prefix + h;
  });
};

const MarkdownGenerated = (props: {| body: Node, filename: string |}) => (
  <div className="phenomic-Markdown">
    <BodyRenderer
      components={{
        h1: MarkdownHeading.H1,
        h2: MarkdownHeading.H2,
        h3: MarkdownHeading.H3,
        h4: MarkdownHeading.H4,
        h5: MarkdownHeading.H5,
        h6: MarkdownHeading.H6
      }}
    >
      {cleanAllHref(props.body, props.filename)}
    </BodyRenderer>
  </div>
);

export default MarkdownGenerated;
