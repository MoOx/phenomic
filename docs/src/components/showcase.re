let component = ReasonReact.statelessComponent "Showcase";

module Styles = {
  let hero =
    ReactDOMRe.Style.make
      height::"50vh" display::"flex" flexDirection::"column" justifyContent::"center" ();
  let heroHeadline =
    ReactDOMRe.Style.make margin::"0" fontSize::"6vw" fontWeight::"200" textAlign::"center" ();
  let container =
    ReactDOMRe.Style.make
      display::"flex"
      flexDirection::"row"
      alignItems::"center"
      justifyContent::"flex-start"
      flexWrap::"wrap"
      ();
  let item = ReactDOMRe.Style.make flexBasis::"50%" flexGrow::"1" padding::"10px" ();
  let title =
    ReactDOMRe.Style.make
      fontSize::"20px" fontWeight::"900" padding::"10px 0" color::"rgba(0, 0, 0, 0.8)" ();
  let screenshot =
    ReactDOMRe.Style.make paddingBottom::"50%" backgroundColor::"#ccc" borderRadius::"4px" ();
};

type post = {
  id: string,
  title: string,
  body: PhenomicContent.jsBody
};

let make ::posts _children => {
  ...component,
  render: fun _ =>
    <div style=(ReactDOMRe.Style.make flexGrow::"1" display::"flex" flexDirection::"column" ())>
      <Header>
        <div style=Styles.hero>
          <h1 style=Styles.heroHeadline> (ReasonReact.stringToElement "They use Phenomic") </h1>
        </div>
      </Header>
      <div style=(ReactDOMRe.Style.make flexGrow::"1" ())>
        (
          switch (posts: PhenomicContent.edge (list post)) {
          | Inactive => ReasonReact.stringToElement "Inactive"
          | Loading => ReasonReact.stringToElement "Loading"
          | Idle posts =>
            <div style=Styles.container>
              (
                posts |>
                List.map (
                  fun item =>
                    <div style=Styles.item key=item.id>
                      <div style=Styles.title> (ReasonReact.stringToElement item.title) </div>
                      <div style=Styles.screenshot />
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
      List {collection: "showcase-entries", by: None, value: None, order: None, limit: None}
    );
  {"posts": posts}
};
