[@bs.module "@phenomic/plugin-renderer-react/lib/client"]
external originalCreateContainer :
  (ReasonReact.reactClass, Js.t({..})) => ReasonReact.reactClass =
  "createContainer";

module BodyRenderer = BodyRenderer;

module Link = Link;

let createContainer = (comp, queries) =>
  originalCreateContainer(comp, queries);

type jsNodeList('a) = {
  .
  "list": array('a),
  "previousPageIsFirst": Js.boolean,
  "previous": Js.nullable(string),
  "next": Js.nullable(string)
};

type edge('a) =
  | Idle('a)
  | Loading
  | Inactive
  | Errored;

type jsEdge('a) = {
  .
  "status": string,
  "node": 'a
};

let jsEdge = jsEdge =>
  switch jsEdge##status {
  | "loading" => Loading
  | "errored" => Errored
  | "idle" => Idle(jsEdge##node)
  | "inactive"
  | _ => Inactive
  };
