open Helpers;

[@react.component]
let make = (~post) => {
  let post' = PhenomicPresetReactApp.jsEdge(post);
  <div>
    {switch ((post': Types.postNode)) {
     | Inactive
     | Loading => "Loading ..." |> text
     | Errored => <ErrorPage />
     | Idle(post) =>
       <div>
         <BsReactHelmet>
           <title> {post##title |> text} </title>
         </BsReactHelmet>
         <h1> {post##title |> text} </h1>
         <PhenomicPresetReactApp.BodyRenderer body=post##body />
       </div>
     }}
  </div>;
};

let queries = props => {
  let post =
    PhenomicPresetReactApp.query(
      Item({path: "content/posts", id: props##params##splat}),
    );
  {"post": post};
};
