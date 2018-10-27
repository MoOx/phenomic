[@bs.module "@phenomic/plugin-renderer-react/lib/client"]
external createContainer_:
  (ReasonReact.reactClass, Js.t({..})) => ReasonReact.reactClass =
  "createContainer";

[@bs.module "@phenomic/plugin-renderer-react/lib/client"]
external withPhenomicApi_:
  (ReasonReact.reactClass, Js.t({..})) => ReasonReact.reactClass =
  "withPhenomicApi";

[@bs.module "@phenomic/plugin-renderer-react/lib/client"]
external withInitialProps_:
  (ReasonReact.reactClass, Js.t({..})) => ReasonReact.reactClass =
  "withInitialProps";

module BodyRenderer = BodyRenderer;

module Link = Link;

let createContainer = (comp, queries) => createContainer_(comp, queries);

let withPhenomicApi = (comp, queries) => withPhenomicApi_(comp, queries);

let withInitialProps = comp => withInitialProps_(comp);

type jsNodeList('a) = {
  .
  "list": array('a),
  "previousPageIsFirst": bool,
  "previous": Js.nullable(string),
  "next": Js.nullable(string),
};

type edge('a) =
  | Idle('a)
  | Loading
  | Inactive
  | Errored;

type jsEdge('a) = {
  .
  "status": string,
  "node": 'a,
};

let jsEdge = jsEdge =>
  switch (jsEdge##status) {
  | "loading" => Loading
  | "error" => Errored
  | "idle" => Idle(jsEdge##node)
  | "inactive"
  | _ => Inactive
  };
