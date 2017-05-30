external createContainer :
  ReactRe.reactClass => Js.t {..} => ReactRe.reactClass =
  "createContainer" [@@bs.module "phenomic-render-react/lib/client"];

let wrapReComponent comp queries => createContainer comp queries;
