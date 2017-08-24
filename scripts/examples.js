// @flow

import path from "path";

import globby from "globby";

import { runCommand } from "./utils.js";

console.log(`Building all examples...`);

const args = process.argv.slice(2);

const examplesFolder = __dirname + "/../examples";
const examples = globby.sync("*/package.json", {
  cwd: examplesFolder
});

examples.forEach(examplePkg => {
  const example = path.dirname(examplePkg);
  console.log("- " + example);
  runCommand("npm", ["run", "build", "--", ...args], {
    cwd: path.join(examplesFolder, example),
    stdio: "ignore"
  });
  runCommand("jest", ["--bail", "examples/" + example, ...args]);
});
