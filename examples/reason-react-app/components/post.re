let component = ReasonReact.statelessComponent "Home";

type post = {
  id: string,
  title: string,
  body: PhenomicContent.jsBody
};

let make ::post => {
  ...component,
  render: fun _self =>
    <div>
      (
        switch (post: PhenomicContent.edge post) {
        | Inactive
        | Loading => ReasonReact.stringToElement "Loading ..."
        | Errored => ReasonReact.stringToElement "An error occured"
        | Idle post =>
          <div>
            <h1> (ReasonReact.stringToElement post.title) </h1>
            <BodyRenderer body=post.body />
          </div>
        }
      )
    </div>
};

let jsPostToReason jsProps => {id: jsProps##id, title: jsProps##title, body: jsProps##body};

let jsComponent =
  ReasonReact.wrapReasonForJs
    ::component
    (fun jsProps => make post::(PhenomicContent.jsEdgeToReason jsProps##post jsPostToReason));

let queries props => {
  let post = PhenomicContent.query (Item {path: "posts", id: props##params##splat});
  {"post": post}
};
