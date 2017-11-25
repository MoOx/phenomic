let component = ReasonReact.statelessComponent("BodyRenderer");

type reasonChildren = list(reasonChild)
and reasonChild =
  | String(string)
  | Element(string, Js.t({.}), reasonChildren)
  | Empty;

type jsBody = {. "t": string, "p": Js.t({.}), "c": Js.Null_undefined.t(array(jsBody))};

let rec jsTreeToReason = (jsChild: jsBody) =>
  switch [%bs.raw {| Object.prototype.toString.call(jsChild) |}] {
  | "[object String]" => String(Js.String.make(jsChild))
  | "[object Object]" =>
    let tag = Js.String.make(jsChild##t);
    let props = jsChild##p;
    let children =
      switch (Js.Null_undefined.to_opt(jsChild##c)) {
      | Some(c) => List.map(jsTreeToReason, Array.to_list(c))
      | None => []
      };
    Element(tag, props, children)
  | _ => Empty
  };

let make = (~body: jsBody, _children) => {
  let rec renderChild = (child) =>
    switch child {
    | String(string) => ReasonReact.stringToElement(string)
    | Element(tag, originalProps, reasonChildren) =>
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
    | Empty => ReasonReact.nullElement
    };
  {
    ...component,
    render: (_self) => {
      let tree = jsTreeToReason(body);
      <div> (renderChild(tree)) </div>
    }
  }
};
