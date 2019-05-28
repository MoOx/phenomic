type reasonChildren = list(reasonChild)
and reasonChild =
  | String(string)
  | Element(string, Js.t({.}), reasonChildren)
  | Empty;

type jsBody = {
  .
  "t": string,
  "p": Js.t({.}),
  "c": Js.Null_undefined.t(array(jsBody)),
};

let rec jsTreeToReason = (jsChild: jsBody) =>
  switch ([%bs.raw {| Object.prototype.toString.call(jsChild) |}]) {
  | "[object String]" => String(Js.String.make(jsChild))
  | "[object Object]" =>
    let tag = Js.String.make(jsChild##t);
    let props = [%bs.raw
      "(function() {
        var p = Object.assign({}, jsChild.p);
        if (p.class) {
          p.className = p.class;
          delete p.class;
        }
        return p;
      })()"
    ];
    let children =
      switch (Js.Null_undefined.toOption(jsChild##c)) {
      | Some(c) => List.map(jsTreeToReason, Array.to_list(c))
      | None => []
      };
    Element(tag, props, children);
  | _ => Empty
  };

[@react.component]
let make = (~body: jsBody) => {
  let rec renderChild = child =>
    switch (child) {
    | String(string) => React.string(string)
    | Element(tag, originalProps, reasonChildren) =>
      switch (tag) {
      | "a" =>
        <Link
          href=[%bs.raw {| child[1].href |}]
          style=[%bs.raw {| child[1].style |}]
          activeStyle=[%bs.raw {| child[1].activeStyle |}]
          className=[%bs.raw {| child[1].className |}]
          activeClassName=[%bs.raw {| child[1].activeClassName |}]>
          {React.array(Array.of_list(List.map(renderChild, reasonChildren)))}
        </Link>
      | _ =>
        ReactDOMRe.createElement(
          tag,
          ~props=ReactDOMRe.objToDOMProps(originalProps),
          [|
            React.array(
              Array.of_list(List.map(renderChild, reasonChildren)),
            ),
          |],
        )
      }
    | Empty => React.null
    };
  body |> jsTreeToReason |> renderChild;
};
