[@bs.module "@phenomic/plugin-renderer-react/lib/components/Link"]
[@react.component]
external link:
  (
    ~href: option(string)=?,
    ~style: option(ReactDOMRe.Style.t)=?,
    ~activeStyle: option(ReactDOMRe.Style.t)=?,
    ~className: option(string)=?,
    ~activeClassName: option(string)=?,
    ~children: array(React.element)
  ) =>
  React.element =
  "default";
