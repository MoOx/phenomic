[@bs.module "@phenomic/plugin-renderer-react/lib/client"]
external originalCreateContainer :
  (ReasonReact.reactClass, Js.t({..})) => ReasonReact.reactClass =
  "createContainer";

module BodyRenderer = BodyRenderer;

module Link = Link;

let createContainer = (comp, queries) =>
  originalCreateContainer(comp, queries);

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

let jsEdgeToReason = jsEdge =>
  switch jsEdge##status {
  | "loading" => Loading
  | "errored" => Errored
  | "idle" => Idle(jsEdge##node)
  | "inactive"
  | _ => Inactive
  };

let mapJsEdgeToReason = (jsEdge, convertNode) =>
  switch jsEdge##status {
  | "loading" => Loading
  | "errored" => Errored
  | "idle" => Idle(convertNode(jsEdge##node))
  | "inactive"
  | _ => Inactive
  };
