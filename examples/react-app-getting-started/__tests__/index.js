// @flow

/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import fs from "fs";

import globby from "globby";

it("should build example correctly", () => {
  const testFolder = __dirname + "/../dist";
  const files = globby.sync("**/*", {
    cwd: testFolder,
    nodir: true,
    dot: true
  });

  // should have html files
  const htmlFiles = files.filter(file => file.endsWith(".html"));
  expect(htmlFiles).toMatchSnapshot();

  const jsonApiFiles = files.filter(
    file => file.startsWith("phenomic") && file.endsWith(".json")
  );
  // should have matching json files
  expect(jsonApiFiles).toMatchSnapshot();

  // should have assets
  const assetsBundlerFiles = files.filter(
    file =>
      !htmlFiles.includes(file) &&
      !jsonApiFiles.includes(file) &&
      file.startsWith("phenomic")
  );
  expect(assetsBundlerFiles.length).toBe(1);
  expect(
    files.filter(
      file =>
        !htmlFiles.includes(file) &&
        !jsonApiFiles.includes(file) &&
        !assetsBundlerFiles.includes(file)
    )
  ).toMatchSnapshot();

  const file1 = fs.readFileSync(
    path.join(__dirname, "..", "dist", "index.html"),
    { encoding: "utf8" }
  );
  expect(file1).toContain("Fifth post");
  expect(file1).toContain('<title data-react-helmet="true">Hello world');
  const file2 = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "dist",
      "after",
      "dGhpcmQtcG9zdA==",
      "index.html"
    ),
    { encoding: "utf8" }
  );
  expect(file2).toContain("Third post");
});
