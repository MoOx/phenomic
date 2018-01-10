open Helpers;

let component = ReasonReact.statelessComponent("Home");

let make = (~posts) => {
  ...component,
  render: _self =>
    <div>
      <h1> ("Home" |> text) </h1>
      (
        switch (posts: Types.postsList) {
        | Inactive
        | Loading => "Loading ..." |> text
        | Errored => "An error occured" |> text
        | Idle(posts) =>
          <ul>
            (
              posts
              |> List.map(item =>
                   <li key=item##id>
                     <PhenomicPresetReactApp.Link
                       href=("blog/" ++ item##id ++ "/")>
                       (item##title |> text)
                     </PhenomicPresetReactApp.Link>
                   </li>
                 )
              |> list
            )
          </ul>
        }
      )
    </div>
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~posts=PhenomicPresetReactApp.mapJsEdgeToReason(jsProps##posts, nodeList)
    )
  );

let queries = (_) => {
  let posts =
    PhenomicPresetReactApp.query(
      List({
        path: "posts",
        by: Some("default"),
        value: None,
        order: None,
        limit: None
      })
    );
  {"posts": posts};
};
