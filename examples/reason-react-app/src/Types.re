type partialPost = {
  .
  "id": string,
  "title": string
};

type postsList = PhenomicPresetReactApp.edge(list(partialPost));

type post = {
  .
  "id": string,
  "title": string,
  "body": PhenomicPresetReactApp.BodyRenderer.jsBody
};

type postNode = PhenomicPresetReactApp.edge(post);
