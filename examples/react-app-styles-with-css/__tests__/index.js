// @flow

import fs from "fs";
import path from "path";

/* eslint-disable import/no-extraneous-dependencies */
import globby from "globby";

it("should build example correctly", () => {
  const testFolder = __dirname + "/../dist";
  const files = globby.sync("**/*", {
    cwd: testFolder,
    nodir: true,
    dot: true,
  });

  const assetsBundlerFiles = files.filter(file => file.startsWith("phenomic"));
  expect(assetsBundlerFiles.length).toBe(2);
  expect(
    fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "dist",
        assetsBundlerFiles.filter(file => file.endsWith(".css")).shift(),
      ),
      { encoding: "utf8" },
    ),
  ).toMatchSnapshot();
});
