let component = ReasonReact.statelessComponent("Home");

type post = {
  .
  "id": string,
  "title": string
};

let make = (~posts) => {
  ...component,
  render: _self =>
    <div>
      <h1> (ReasonReact.stringToElement("Home")) </h1>
      (
        switch (posts: PhenomicPresetReactApp.edge(list(post))) {
        | Inactive
        | Loading => ReasonReact.stringToElement("Loading ...")
        | Errored => ReasonReact.stringToElement("An error occured")
        | Idle(posts) =>
          <ul>
            (
              posts
              |> List.map(item =>
                   <li key=item##id>
                     <PhenomicPresetReactApp.Link
                       href=("blog/" ++ item##id ++ "/")>
                       (ReasonReact.stringToElement(item##title))
                     </PhenomicPresetReactApp.Link>
                   </li>
                 )
              |> Array.of_list
              |> ReasonReact.arrayToElement
            )
          </ul>
        }
      )
    </div>
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~posts=
        PhenomicPresetReactApp.jsEdgeToReason(jsProps##posts, posts =>
          posts##list |> Array.to_list
        )
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
