/* eslint-disable react/no-multi-comp */
// because it considers render() as a react compo
/* eslint-disable react/no-unused-prop-types */
// because it's a bit dumb

import React from "react";

import Link from "./Link.js";

type ComponentType = string | Class<React.Component<*, *, *>> | Function;

type OptionsType = {
  components?: { [key: string]: ComponentType },
  DefaultComponent?: ComponentType
};

type ItemType =
  | string
  | {
      // tag
      t?: string,
      // props
      p?: Object,
      // children
      // @todo use this type
      // https://github.com/yannickcr/eslint-plugin-react/pull/1138
      // note that eslint-disable is not working as it remove, after being found
      // errors and warnings
      // c: ItemType | Array<ItemType>,
      c: Object
    };

type PropsType = OptionsType & {
  children?: string | ItemType
};

const defaultOptions: OptionsType = {
  components: {
    a: Link
  }
};

const render = (item: ItemType, options: OptionsType, key: ?any) => {
  if (!item) {
    return;
  }
  if (typeof item === "string") {
    return item;
  }
  const { p: props = {}, c: children } = item;
  const Tag =
    (options.components && item.t && options.components[item.t]) ||
    item.t ||
    options.DefaultComponent ||
    "div";
  return (
    <Tag {...props} key={key}>
      {Array.isArray(children)
        ? children.map((child: ItemType, key) => render(child, options, key))
        : render(children, options)}
    </Tag>
  );
};

const BodyRenderer = ({ children, ...props }: PropsType) => {
  if (typeof children === "undefined") {
    console.error(
      "@phenomic/plugin-renderer-react: BodyRenderer expects at least a child"
    );
    return null;
  }
  if (typeof children === "string") {
    return <div dangerouslySetInnerHTML={{ __html: children }} />;
  }
  const r = render(children, {
    ...defaultOptions,
    ...(props || {}),
    // force to mix components, as default one (Link) is crucial
    components: {
      ...defaultOptions.components,
      ...(props.components || {})
    }
  });
  return typeof r === "string"
    ? <props.DefaultComponent>{r}</props.DefaultComponent>
    : r;
};

export default BodyRenderer;
