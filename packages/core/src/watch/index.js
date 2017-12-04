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

function reduceExtensions(plugins: PhenomicPlugins): Array<string> {
  const supportedFileTypes = plugins.reduce((acc, plugin: PhenomicPlugin) => {
    if (plugin.supportedFileTypes) {
      debug(
        `'${plugin.name}' want to support '${String(
          plugin.supportedFileTypes
        )}'`
      );
    }
    return [
      ...acc,
      ...(plugin &&
      plugin.supportedFileTypes &&
      Array.isArray(plugin.supportedFileTypes)
        ? plugin.supportedFileTypes
        : [])
    ];
  }, []);
  debug("extensions to watch", supportedFileTypes);
  return supportedFileTypes;
}

function getGlobPattern(plugins: PhenomicPlugins): Array<string> {
  return reduceExtensions(plugins).map(
    (extension: string) => `**/*.${extension}`
  );
}

function glob(path, patterns) {
  return globby.sync(patterns, { cwd: path }).map(file => toFile(path, file));
}

export function oneShot(config: {
  path: string,
  plugins: PhenomicPlugins
}): Array<PhenomicContentFile> {
  return glob(config.path, getGlobPattern(config.plugins));
}

function createWatcher(config: { path: string, plugins: PhenomicPlugins }) {
  const patterns = getGlobPattern(config.plugins);
  debug("path:", config.path);
  debug("extensions:", patterns);
  const watcher = sane(config.path, {
    watchman: canUseWatchman,
    glob: patterns
  });
  let subscribers = [];
  let ready = false;
  let closeMe = false;
  const files: Array<PhenomicContentFile> = globby
    .sync(patterns, { cwd: config.path })
    .map(file => toFile(config.path, file));
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
    files.push(toFile(config.path, filepath));
    subscribers.forEach(func => func(files));
  });
  watcher.on("delete", (filepath, root) => {
    debug("watcher: file deleted", filepath, root);
    const index = files.find(
      (file: PhenomicContentFile) => file && file.name === filepath
    );
    if (index) {
      delete files[files.indexOf(index)];
    }
    subscribers.forEach(func => func(files));
  });

  return {
    onChange(func: (files: Array<PhenomicContentFile>) => Promise<void>) {
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
