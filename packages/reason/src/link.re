external link : ReasonReact.reactClass =
  "default" [@@bs.module "@phenomic/plugin-renderer-react/lib/components/Link"];

let make
    toURL::(toURL: string)
    style::(style: option ReactDOMRe.Style.t)=?
    activeStyle::(activeStyle: option ReactDOMRe.Style.t)=?
    className::(className: option string)=?
    activeClassName::(activeClassName: option string)=?
    children =>
  ReasonReact.wrapJsForReason
    reactClass::link
    props::{
      "to": toURL,
      "style": Js.Undefined.from_opt style,
      "activeStyle": Js.Undefined.from_opt activeStyle,
      "className": Js.Undefined.from_opt className,
      "activeClassName": Js.Undefined.from_opt activeClassName
    }
    children;
