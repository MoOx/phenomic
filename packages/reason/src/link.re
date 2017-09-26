external link : ReasonReact.reactClass =
  "default" [@@bs.module "@phenomic/plugin-renderer-react/lib/components/Link"];

let make
    toURL::(toURL: option string)=?
    style::(style: option ReactDOMRe.Style.t)=?
    activeStyle::(activeStyle: option ReactDOMRe.Style.t)=?
    className::(className: option string)=?
    activeClassName::(activeClassName: option string)=?
    children =>
  ReasonReact.wrapJsForReason
    reactClass::link
    props::{
      "href": Js.Nullable.from_opt toURL,
      "style": Js.Nullable.from_opt style,
      "activeStyle": Js.Nullable.from_opt activeStyle,
      "className": Js.Nullable.from_opt className,
      "activeClassName": Js.Nullable.from_opt activeClassName
    }
    children;
