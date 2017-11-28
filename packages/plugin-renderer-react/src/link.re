[@bs.module "@phenomic/plugin-renderer-react/lib/components/Link"]
external link : ReasonReact.reactClass =
  "default";

let make =
    (
      ~href: option(string)=?,
      ~style: option(ReactDOMRe.Style.t)=?,
      ~activeStyle: option(ReactDOMRe.Style.t)=?,
      ~className: option(string)=?,
      ~activeClassName: option(string)=?,
      children
    ) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=link,
    ~props={
      "href": Js.Nullable.from_opt(href),
      "style": Js.Nullable.from_opt(style),
      "activeStyle": Js.Nullable.from_opt(activeStyle),
      "className": Js.Nullable.from_opt(className),
      "activeClassName": Js.Nullable.from_opt(activeClassName)
    },
    children
  );
