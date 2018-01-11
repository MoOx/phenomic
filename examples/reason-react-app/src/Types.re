type partialPost = {
  .
  "id": string,
  "title": string
};

type posts =
  PhenomicPresetReactApp.edge(PhenomicPresetReactApp.jsNodeList(partialPost));

type post = {
  .
  "id": string,
  "title": string,
  "body": PhenomicPresetReactApp.BodyRenderer.jsBody
};

type postNode = PhenomicPresetReactApp.edge(post);
