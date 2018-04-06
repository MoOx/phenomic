import unified from "unified";
import html from "rehype-stringify";
import rehype2react from "rehype-react";

export type plugin =
  | string
  | Function
  | $ReadOnlyArray<string | Function | any>;

// here we optimize structure just a little to have to smallest json possible
const createElement = (component, props, children) => {
  return {
    t: component,
    ...(props && Object.keys(props).length ? { p: props } : {}),
    ...(children ? { c: children } : {})
  };
};

export default (
  {
    output,
    plugins
  }: {|
    output?: "json" | "html",
    plugins?: $ReadOnlyArray<plugin>
  |} = {}
) => {
  const processor = unified();
  if (plugins)
    plugins.forEach(plugin => {
      if (typeof plugin === "function") {
        processor.use(plugin);
        return;
      }
      if (typeof plugin === "string") {
        // $FlowFixMe 🤫
        processor.use(require(plugin));
        return;
      }
      if (Array.isArray(plugin) && plugin.length === 2) {
        if (typeof plugin[0] === "function") {
          processor.use(plugin[0], plugin[1]);
          return;
        }
        if (typeof plugin[0] === "string") {
          // $FlowFixMe 🤫
          processor.use(require(plugin[0]), plugin[1]);
          return;
        }
      }
      throw new Error(
        "A plugin for 'unified' can be a string (module name), a function, or an array of [string|function, {options}]. You gave " +
          plugin.toString()
      );
    });

  if (output === "json") {
    processor.use(rehype2react, { createElement });
  } else {
    processor.use(html);
  }

  return processor;
};
