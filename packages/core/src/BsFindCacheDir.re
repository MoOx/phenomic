type options = {
  .
  "name": string,
  "create": bool,
};

[@bs.module] external findCacheDir: options => string = "find-cache-dir";

let make = (~name, ~create, _) =>
  findCacheDir({"name": name, "create": create});
