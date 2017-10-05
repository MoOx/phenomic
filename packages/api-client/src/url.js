function postfix(url) {
  return `${url}.json`;
}

const protect = encodeURIComponent;
const urlify = (pieces: Array<?string>): string =>
  pieces.filter(piece => typeof piece !== "undefined").join("/");

function url(config: Object): string {
  const root = config.root || "";
  if (typeof config === "string") {
    return urlify([root, config]);
  }
  if (typeof config.id === "string") {
    return postfix(
      urlify([
        root,
        config.path ? protect(config.path) : undefined,
        "item",
        config.id
      ])
    );
  }
  return postfix(
    urlify([
      root,
      config.path ? protect(config.path) : undefined,
      `by-${protect(config.by)}`,
      protect(config.value || "1"),
      protect(config.order || "desc"),
      ...(config.limit ? [`limit-${protect(config.limit)}`] : []),
      ...(config.limit && config.after
        ? [`after-${protect(config.after)}`]
        : [])
    ])
  );
}

export default url;
