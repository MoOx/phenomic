[@bs.module "@phenomic/plugin-renderer-react/lib/components/Link"]
[@react.component]
external make:
  (
    ~href: string=?,
    ~style: ReactDOMRe.Style.t=?,
    ~activeStyle: ReactDOMRe.Style.t=?,
    ~className: string=?,
    ~activeClassName: string=?,
    ~children: React.element
  ) =>
  React.element =
  "default";
