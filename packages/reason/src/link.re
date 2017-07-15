external link : ReasonReact.reactClass = "Link" [@@bs.module "react-router"];

let make ::toURL children =>
  ReasonReact.wrapJsForReason reactClass::link props::{"to": toURL} children;
