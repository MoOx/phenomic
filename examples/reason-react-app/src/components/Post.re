open Helpers;

let component = ReasonReact.statelessComponent("Post");

let make = (~post) => {
  ...component,
  render: _self =>
    <div>
      (
        switch (post: Types.postNode) {
        | Inactive
        | Loading => "Loading ..." |> text
        | Errored => "An error occured" |> text
        | Idle(post) =>
          <div>
            <h1> (post##title |> text) </h1>
            <PhenomicPresetReactApp.BodyRenderer body=post##body />
          </div>
        }
      )
    </div>
};

let jsComponent =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~post=PhenomicPresetReactApp.jsEdgeToReason(jsProps##post))
  );

let queries = props => {
  let post =
    PhenomicPresetReactApp.query(
      Item({path: "posts", id: props##params##splat})
    );
  {"post": post};
};
