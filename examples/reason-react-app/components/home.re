let component = ReasonReact.statelessComponent "Home";

type post = {
  id: string,
  title: string
};

let make ::posts => {
  ...component,
  render: fun _self =>
    <div>
      <h1> (ReasonReact.stringToElement "Home") </h1>
      (
        switch (posts: PhenomicContent.edge (list post)) {
        | Inactive
        | Loading => ReasonReact.stringToElement "Loading ..."
        | Errored => ReasonReact.stringToElement "An error occured"
        | Idle posts =>
          <ul>
            (
              posts |>
              List.map (
                fun item =>
                  <li key=item.id>
                    <Link toURL=("blog/" ^ item.id ^ "/")>
                      (ReasonReact.stringToElement item.title)
                    </Link>
                  </li>
              ) |> Array.of_list |> ReasonReact.arrayToElement
            )
          </ul>
        }
      )
    </div>
};

let jsPostToReason jsProps => {id: jsProps##id, title: jsProps##title};

let jsComponent =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make
          posts::(
            PhenomicContent.jsEdgeToReason
              jsProps##posts
              (fun posts => posts##list |> Array.map jsPostToReason |> Array.to_list)
          )
    );

let queries _ => {
  let posts =
    PhenomicContent.query (
      List {path: "posts", by: Some "default", value: None, order: None, limit: None}
    );
  {"posts": posts}
};
