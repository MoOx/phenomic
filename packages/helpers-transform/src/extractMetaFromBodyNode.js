// @flow

type Node =
  | string
  | {|
      t?: string,
      p?: Object,
      c?: Node | $ReadOnlyArray<Node>
    |};

const renderText = (node?: Node) => {
  if (!node) return "";
  if (typeof node === "string") return node;
  return Array.isArray(node.c)
    ? node.c.map((child: Node) => renderText(child)).join("")
    : renderText(node.c);
};

const getHeaders = (node?: Node) => {
  if (!node) return [];
  if (typeof node.t === "string") {
    const tag = node.t;
    const level = parseInt(tag[1], 10);
    if (tag[0] === "h" && !isNaN(level)) {
      return [[level, renderText(node)]];
    }
  }
  return (Array.isArray(node.c)
    ? // $FlowFixMe stfu
      node.c.reduce((acc, child: Node) => acc.concat(getHeaders(child)), [])
    : // $FlowFixMe stfu
      getHeaders(node.c)
  ).filter(h => h);
};

export default (node: Node) => {
  const headers = getHeaders(node);
  const firstH1 = headers.find(h => h[0] === 1);
  return {
    ...(firstH1 ? { title: firstH1[1] } : {}),
    ...(headers.length > 0 ? { headers } : {})
  };
};
