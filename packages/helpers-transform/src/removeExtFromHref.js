// @flow

type Node =
  | string
  | {|
      t?: string,
      p?: Object,
      c?: Node | $ReadOnlyArray<Node>
    |};

const removeExtFromHref = (node?: Node, ext: string = "md") => {
  if (!node) return;
  if (node.p && node.p.href) {
    // $FlowFixMe stfu
    node.p.href = node.p.href.replace(new RegExp(`\\.${ext}$`), "");
  }
  if (Array.isArray(node.c))
    // $FlowFixMe stfu
    node.c.map((child: Node) => removeExtFromHref(child, ext));
  else
    // $FlowFixMe stfu
    removeExtFromHref(node.c, ext);

  return node;
};

export default removeExtFromHref;
