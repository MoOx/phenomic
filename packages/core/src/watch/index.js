// @flow

import path from "path";

import sane from "sane";
import globby from "globby";

const execSync = require("child_process").execSync;

const canUseWatchman = ((): boolean => {
  try {
    execSync("watchman --version", { stdio: ["ignore"] });
    return true;
  } catch (e) {
    return false;
  }
})();

const debug = require("debug")("phenomic:core:watch");

const toFile = (root, filepath) => ({
  name: filepath,
  fullpath: path.join(root, filepath)
});

function glob(path, patterns) {
  return globby.sync(patterns, { cwd: path }).map(file => toFile(path, file));
}

export function oneShot(options: {
  path: string,
  patterns: $ReadOnlyArray<string>
}): $ReadOnlyArray<PhenomicContentFile> {
  return glob(options.path, options.patterns);
}

function createWatcher(options: {
  path: string,
  patterns: $ReadOnlyArray<string>
}) {
  debug("path:", options.path);
  debug("extensions:", options.patterns);
  const watcher = sane(options.path, {
    watchman: canUseWatchman,
    glob: options.patterns
  });
  let subscribers = [];
  let ready = false;
  let closeMe = false;
  /* eslint-disable flowtype/no-mutable-array */
  const files: Array<PhenomicContentFile> = globby
    .sync(options.patterns, { cwd: options.path })
    .map(file => toFile(options.path, file));
  debug("files", files.map(file => file.name));

  watcher.on("ready", () => {
    debug("watcher: ready");
    ready = true;
    if (closeMe) {
      debug("watcher: will close");
      // close but not like NOW because leveldb might crash (no idea why)
      setTimeout(() => {
        debug("watcher: closed after being ready");
        watcher.close();
      }, 1000);
    }
  });
  watcher.on("change", (filepath, root, stat) => {
    debug("watcher: file changed", filepath, root, stat);
    subscribers.forEach(func => func(files));
  });
  watcher.on("add", (filepath, root, stat) => {
    debug("watcher: file added", filepath, root, stat);
    files.push(toFile(options.path, filepath));
    subscribers.forEach(func => func(files));
  });
  watcher.on("delete", (filepath, root) => {
    debug("watcher: file deleted", filepath, root);
    const index = files.find(file => file && file.name === filepath);
    if (index) {
      delete files[files.indexOf(index)];
    }
    subscribers.forEach(func => func(files));
  });

  return {
    onChange(
      func: (files: $ReadOnlyArray<PhenomicContentFile>) => Promise<void>
    ) {
      debug("watcher#onChange");
      func(files);
      subscribers = [...subscribers, func];
      return function unsubscribe() {
        return (subscribers = subscribers.filter(item => item !== func));
      };
    },
    close() {
      debug("watcher#closed");
      subscribers = [];
      // sane can be "slow" to say "I am ready"
      // and during static build, we close the watcher directly
      // we should probably not use a watcher for static build
      // but I am lazy and will refactor later
      if (!ready) {
        debug("watcher: will close after being ready");
        closeMe = true;
        return;
      }
      watcher.close();
    }
  };
}

export default createWatcher;
