[@bs.module "@phenomic/plugin-renderer-react/lib/client"]
external createContainer : (ReasonReact.reactClass, Js.t({..})) => ReasonReact.reactClass =
  "createContainer";

let wrapReComponent = (comp, queries) => createContainer(comp, queries);
