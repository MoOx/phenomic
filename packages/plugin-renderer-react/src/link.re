[@bs.module "@phenomic/plugin-renderer-react/lib/components/Link"]
[@react.component]
external make:
  (
    ~href: option(string)=?,
    ~style: option(ReactDOMRe.Style.t)=?,
    ~activeStyle: option(ReactDOMRe.Style.t)=?,
    ~className: option(string)=?,
    ~activeClassName: option(string)=?,
    ~children,
  ) =>
  React.element =
  "default";
