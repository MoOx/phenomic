// @flow

import path from "path";

import globby from "globby";

import { runCommand } from "./utils.js";

console.log(`Building all examples...`);

const examplesFolder = __dirname + "/../examples";
const examples = globby.sync("*", {
  cwd: examplesFolder
});

examples.forEach(example => {
  console.log("- " + example);
  runCommand("npm", ["run", "build"], {
    cwd: path.join(examplesFolder, example),
    stdio: "ignore"
  });
  runCommand("jest", ["--bail", "examples/" + example]);
});
