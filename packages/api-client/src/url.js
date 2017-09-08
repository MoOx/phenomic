function postfix(url) {
  return `${url}.json`;
}

const protect = encodeURIComponent;

function url(config: Object): string {
  const root = config.root || "";
  if (typeof config === "string") {
    return [root, config].join("/");
  }
  if (typeof config.id === "string") {
    return postfix([root, config.path, "item", config.id].join("/"));
  }
  return postfix(
    [
      root,
      protect(config.path),
      `by-${protect(config.by)}`,
      protect(config.value || "1"),
      protect(config.order || "desc"),
      ...(config.limit ? [`limit-${protect(config.limit)}`] : []),
      ...(config.limit && config.after
        ? [`after-${protect(config.after)}`]
        : [])
    ].join("/")
  );
}

export default url;
