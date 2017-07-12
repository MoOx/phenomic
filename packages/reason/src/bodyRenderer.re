let component = ReasonReact.statelessComponent "BodyRenderer";

let make body::(body: PhenomicContent.jsBody) _children => {
  let rec renderChild child =>
    switch child {
    | PhenomicContent.String string => ReasonReact.stringToElement string
    | PhenomicContent.Element tag originalProps reasonChildren =>
      let props = ReactDOMRe.objToDOMProps originalProps;
      ReactDOMRe.createElement
        tag
        ::props
        [|ReasonReact.arrayToElement (Array.of_list (List.map renderChild reasonChildren))|]
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
