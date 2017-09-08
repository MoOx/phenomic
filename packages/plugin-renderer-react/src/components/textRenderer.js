/* eslint-disable react/no-multi-comp */
// because it considers render() as a react compo
/* eslint-disable react/no-unused-prop-types */
// because it's a bit dumb

import striptags from "striptags";

type ItemType =
  | string
  | {
      // tag
      t?: string,
      // props
      p?: Object,
      // children
      c: ItemType | Array<ItemType>
    };

const render = (item: ItemType) => {
  if (!item) {
    return "";
  }

  if (typeof item === "string") {
    return item;
  }

  const { c: children } = item;

  return Array.isArray(children)
    ? children.map((child: ItemType) => render(child)).join("")
    : render(children);
};

const textRenderer = (tree?: ItemType) => {
  if (typeof tree === "undefined") {
    console.error(
      "@phenomic/plugin-renderer-react: textRenderer expects at least a child"
    );
    return "";
  }

  if (typeof tree === "string") {
    return striptags(tree);
  }

  return render(tree);
};

export default textRenderer;
