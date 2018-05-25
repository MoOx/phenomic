[@bs.module "@phenomic/plugin-renderer-react/lib/components/Link"]
external link : ReasonReact.reactClass = "default";

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
      "href": Js.Nullable.fromOption(href),
      "style": Js.Nullable.fromOption(style),
      "activeStyle": Js.Nullable.fromOption(activeStyle),
      "className": Js.Nullable.fromOption(className),
      "activeClassName": Js.Nullable.fromOption(activeClassName)
    },
    children
  );
