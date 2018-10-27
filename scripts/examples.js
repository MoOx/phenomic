// @flow

import path from "path";

import globby from "globby";

import { runCommand } from "./utils.js";

console.log(`Building all examples...\n`);

const args = process.argv.slice(2);

const examplesFolder = __dirname + "/../examples";
const examples = globby.sync("*/package.json", {
  cwd: examplesFolder,
});
examples.filter(example => example.match(args[0])).forEach(examplePkg => {
  const example = path.dirname(examplePkg);
  console.log("- examples/" + example);
  runCommand("npm", ["run", "build"], {
    cwd: path.join(examplesFolder, example),
    // stdio: "ignore"
  });
});
