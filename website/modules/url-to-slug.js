// @flow

export default url =>
  url
    .replace(/https?:\/\//, "")
    .replace(/\/$/, "")
    .replace(/\//g, "_");
