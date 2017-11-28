let component = ReasonReact.statelessComponent("Home");

type post = {
  id: string,
  title: string,
  body: PhenomicPresetReactApp.BodyRenderer.jsBody
};

let make = (~post) => {
  ...component,
  render: (_self) =>
    <div>
      (
        switch (post: PhenomicPresetReactApp.edge(post)) {
        | Inactive
        | Loading => ReasonReact.stringToElement("Loading ...")
        | Errored => ReasonReact.stringToElement("An error occured")
        | Idle(post) =>
          <div>
            <h1> (ReasonReact.stringToElement(post.title)) </h1>
            <PhenomicPresetReactApp.BodyRenderer body=post.body />
          </div>
        }
      )
    </div>
};

let jsPostToReason = (jsProps) => {id: jsProps##id, title: jsProps##title, body: jsProps##body};

let jsComponent =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) => make(~post=PhenomicPresetReactApp.jsEdgeToReason(jsProps##post, jsPostToReason))
  );

let queries = (props) => {
  let post = PhenomicPresetReactApp.query(Item({path: "posts", id: props##params##splat}));
  {"post": post}
};
