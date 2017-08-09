// @flow

import path from "path";

import { yarnOrNot, runCommand } from "./utils.js";

console.log(`Setting up Phenomic's development environment...`);
const isWindows = process.platform === "win32";
const lerna = isWindows ? "lerna.cmd" : "lerna";
const cmd = path.resolve(__dirname, "../node_modules/.bin/" + lerna);
const args = process.argv.slice(2);
yarnOrNot() && args.push("--npmClient=yarn");
process.env.CI && args.push("--concurrency=1");

runCommand(cmd, args);
