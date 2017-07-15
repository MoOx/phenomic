external createContainer :
  ReasonReact.reactClass => Js.t {..} => ReasonReact.reactClass =
  "createContainer" [@@bs.module "@phenomic/plugin-renderer-react/lib/client"];

let wrapReComponent comp queries => createContainer comp queries;
