// @flow

type Node =
  | string
  | {|
      t?: string,
      p?: Object,
      c?: Node | $ReadOnlyArray<Node>
    |};

const renderText = (node?: Node): string => {
  if (!node) return "";
  if (typeof node === "string") return node;
  return Array.isArray(node.c)
    ? node.c.map((child: Node) => renderText(child)).join("")
    : renderText(node.c);
};

const getHeadings = (
  node?: Node
): $ReadOnlyArray<{ level: number, text: string, id: string }> => {
  if (!node) return [];
  if (typeof node.t === "string") {
    const tag = node.t;
    const level = parseInt(tag[1], 10);
    if (tag[0] === "h" && !isNaN(level)) {
      return [
        {
          level,
          text: renderText(node),
          id: node.p && node.p.id ? String(node.p.id) : ""
        }
      ];
    }
  }
  return (Array.isArray(node.c)
    ? // $FlowFixMe stfu
      node.c.reduce((acc, child: Node) => acc.concat(getHeadings(child)), [])
    : // $FlowFixMe stfu
      getHeadings(node.c)
  ).filter(h => h);
};

export default (node: Node) => {
  const headings = getHeadings(node);
  const firstH1 = headings.find(h => h.level === 1);
  return {
    ...(firstH1 ? { title: firstH1[1] } : {}),
    ...(headings.length > 0 ? { headings } : {})
  };
};
