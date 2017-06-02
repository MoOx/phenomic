/* eslint-disable react/no-multi-comp */
// because it considers render() as a react compo
/* eslint-disable react/no-unused-prop-types */
// because it's a bit dumb

import React from "react";
// @todo add Phenomic Link
// import Link from "./Link.js"

type ComponentType = string | Class<React.Component<*, *, *>> | Function;

type OptionsType = {
  components: { [key: string]: ComponentType },
  DefaultComponent: ComponentType
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

type PropsType = {
  children: string | ItemType,
  options: OptionsType
};

const defaultOptions: OptionsType = {
  components: {
    // a: Link
  },
  DefaultComponent: "div"
};

const render = (item: ItemType, options: OptionsType, key: ?any) => {
  if (!item) {
    return;
  }
  if (typeof item === "object") {
    const {
      t: Tag = options.DefaultComponent,
      p: props = {},
      c: children
    } = item;
    return (
      <Tag {...props} key={key}>
        {Array.isArray(children)
          ? children.map((child: ItemType, key) => render(child, options, key))
          : render(children, options)}
      </Tag>
    );
  }
  return item;
};

const BodyRenderer = (props: PropsType) => {
  if (typeof props.children === "string") {
    return <div dangerouslySetInnerHTML={{ __html: props.children }} />;
  }
  return render(props.children, {
    ...defaultOptions,
    ...(props.options || {})
  });
};

export default BodyRenderer;
