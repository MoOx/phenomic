let component = ReasonReact.statelessComponent "BodyRenderer";

let make body::(body: PhenomicContent.jsBody) _children => {
  let rec renderChild child =>
    switch child {
    | PhenomicContent.String string => ReasonReact.stringToElement string
    | PhenomicContent.Element tag originalProps reasonChildren =>
      let props = ReactDOMRe.objToDOMProps originalProps;
      switch tag {
      | "a" =>
        <Link toURL=[%bs.raw {| child[1].href |}]>
          ([%bs.raw {|child[2]|}] |> Array.of_list |> ReasonReact.arrayToElement)
        </Link>
      | _ =>
        ReactDOMRe.createElement
          tag
          ::props
          [|ReasonReact.arrayToElement (Array.of_list (List.map renderChild reasonChildren))|]
      }
    | PhenomicContent.Empty => ReasonReact.nullElement
    };
  {
    ...component,
    render: fun _self => {
      let tree = PhenomicContent.jsTreeToReason body;
      <div> (renderChild tree) </div>
    }
  }
};
