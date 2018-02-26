open Helpers;

let component = ReasonReact.statelessComponent("Post");

let make = (~message: option(string)=?, _) => {
  ...component,
  render: _self =>
    <div style=(ReactDOMRe.Style.make(~fontSize="80px", ()))>
      (
        switch message {
        | None => "An error occured" |> text
        | Some(msg) => msg |> text
        }
      )
    </div>
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~message=?Js.Nullable.to_opt(jsProps##message), [||])
  );
