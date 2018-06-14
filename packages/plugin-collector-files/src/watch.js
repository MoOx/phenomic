// @flow

import sane from "sane";

const execSync = require("child_process").execSync;

const canUseWatchman = ((): boolean => {
  try {
    execSync("watchman --version", { stdio: ["ignore"] });
    return true;
  } catch (e) {
    return false;
  }
})();

const debug = require("debug")("phenomic:plugin:collector-files");

export default (options: {
  path: string,
  patterns: $ReadOnlyArray<string>
}) => {
  debug("path:", options.path);
  debug("extensions:", options.patterns);
  return sane(options.path, {
    watchman: canUseWatchman,
    glob: options.patterns
  });
};
