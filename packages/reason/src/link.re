external link : ReasonReact.reactClass =
  "default" [@@bs.module "@phenomic/plugin-renderer-react/lib/components/Link"];

let make ::toURL children =>
  ReasonReact.wrapJsForReason reactClass::link props::{"to": toURL} children;
