let component = ReasonReact.statelessComponent("BodyRenderer");

let make = (~body: PhenomicContent.jsBody, _children) => {
  let rec renderChild = (child) =>
    switch child {
    | PhenomicContent.String(string) => ReasonReact.stringToElement(string)
    | PhenomicContent.Element(tag, originalProps, reasonChildren) =>
      switch tag {
      | "a" =>
        <Link
          href=[%bs.raw {| child[1].href |}]
          style=[%bs.raw {| child[1].style |}]
          activeStyle=[%bs.raw {| child[1].activeStyle |}]
          className=[%bs.raw {| child[1].className |}]
          activeClassName=[%bs.raw {| child[1].activeClassName |}]>
          (ReasonReact.arrayToElement(Array.of_list(List.map(renderChild, reasonChildren))))
        </Link>
      | _ =>
        ReactDOMRe.createElement(
          tag,
          ~props=ReactDOMRe.objToDOMProps(originalProps),
          [|ReasonReact.arrayToElement(Array.of_list(List.map(renderChild, reasonChildren)))|]
        )
      }
    | PhenomicContent.Empty => ReasonReact.nullElement
    };
  {
    ...component,
    render: (_self) => {
      let tree = PhenomicContent.jsTreeToReason(body);
      <div> (renderChild(tree)) </div>
    }
  }
};
