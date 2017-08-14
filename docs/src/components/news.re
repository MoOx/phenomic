let component = ReasonReact.statelessComponent "News";

type post = {
  id: string,
  title: string,
  body: PhenomicContent.jsBody
};

let make ::posts _children => {
  ...component,
  render: fun _ =>
    <div style=(ReactDOMRe.Style.make flexGrow::"1" display::"flex" flexDirection::"column" ())>
      <Header />
      <div style=(ReactDOMRe.Style.make flexGrow::"1" ())>
        (
          switch (posts: PhenomicContent.edge (list post)) {
          | Inactive => ReasonReact.stringToElement "Inactive"
          | Loading => ReasonReact.stringToElement "Loading"
          | Idle posts =>
            <div>
              (
                posts |>
                List.map (
                  fun item =>
                    <div style=(ReactDOMRe.Style.make padding::"10px" ())>
                      (ReasonReact.stringToElement item.title)
                    </div>
                ) |> Array.of_list |> ReasonReact.arrayToElement
              )
            </div>
          | Errored => ReasonReact.stringToElement "Errored"
          }
        )
      </div>
      <Footer />
    </div>
};

let jsPostsToReason jsPosts =>
  jsPosts##list |> Array.to_list |>
  List.map (fun item => {id: item##id, title: item##title, body: item##body});

let jsComponent =
  ReasonReact.wrapReasonForJs
    ::component
    (
      fun jsProps =>
        make posts::(PhenomicContent.jsEdgeToReason jsProps##posts jsPostsToReason) [||]
    );

let queries props => {
  let posts =
    PhenomicContent.query (
      List {collection: "news", by: None, value: None, order: None, limit: None}
    );
  {"posts": posts}
};
