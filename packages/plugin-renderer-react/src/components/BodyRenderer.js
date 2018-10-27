// @flow

/* eslint-disable react/no-multi-comp */
// because it considers render() as a react compo
/* eslint-disable react/no-unused-prop-types */
// because it's a bit dumb

import * as React from "react";

import Link from "./Link.js";

type ComponentType = string | React.ComponentType<*>;

// eslint-disable-next-line flowtype/require-exact-type
type OptionsType = {
  components?: { [key: string]: ComponentType },
  DefaultComponent?: ComponentType,
};

type ItemType =
  | string
  | {
      // tag
      t?: string,
      // props
      p?: Object,
      // children
      c: ItemType | $ReadOnlyArray<ItemType>,
    };

type PropsType = OptionsType & {
  children?: ItemType,
};

const defaultProps = { DefaultComponent: "div" };

const defaultOptions: OptionsType = {
  components: {
    a: Link,
  },
};

const render = (item: ItemType, options: OptionsType, key: ?any) => {
  if (!item) {
    return null;
  }
  if (typeof item === "string") {
    return item;
  }
  const { p: props = {}, c: children } = item;
  const Tag =
    (options.components && item.t && options.components[item.t]) ||
    item.t ||
    options.DefaultComponent ||
    defaultProps.DefaultComponent;

  const newProps = { ...props };
  // special case for html class
  if (newProps.class) {
    newProps.className = newProps.class;
    delete newProps.class;
  }

  return (
    // $FlowFixMe will fix later
    <Tag {...newProps} key={key}>
      {Array.isArray(children)
        ? children.map((child: ItemType, key) => render(child, options, key))
        : render(children, options)}
    </Tag>
  );
};

const BodyRenderer = ({ children, ...props }: PropsType) => {
  if (typeof children === "undefined") {
    console.error(
      "@phenomic/plugin-renderer-react: BodyRenderer expects at least a child",
    );
    return null;
  }
  if (typeof children === "string") {
    return <div dangerouslySetInnerHTML={{ __html: children }} />;
  }
  const r = render(children, {
    ...defaultOptions,
    ...(props || defaultProps),
    // force to mix components, as default one (Link) is crucial
    components: {
      ...defaultOptions.components,
      ...(props.components || {}),
    },
  });
  const { DefaultComponent = defaultProps.DefaultComponent } = props;
  return typeof r === "string" ? <DefaultComponent>{r}</DefaultComponent> : r;
};

export default BodyRenderer;
