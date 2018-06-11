// @flow

const { spawn } = require("child_process");
const { join } = require("path");

const globby = require("globby");

const packages = globby.sync("*", {
  cwd: "packages",
  onlyDirectories: true
});

const cleanNL = buff => buff.toString().replace(/\n$/, "");

packages.forEach(pkg => {
  const cwd = join(__dirname, "packages", pkg);
  const cmd = spawn(
    "../../node_modules/.bin/bsb",
    "-make-world -w".split(" "),
    { cwd }
  );

  cmd.stdout.on("data", data => {
    console.log(`${pkg}: ${cleanNL(data)}`);
  });

  cmd.stderr.on("data", data => {
    console.error(`${pkg}: ${cleanNL(data)}`);
  });

  cmd.on("close", code => {
    console.log(`${pkg}: child process exited with code ${code}`);
  });
});
