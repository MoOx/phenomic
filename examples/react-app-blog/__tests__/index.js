// @flow

/* eslint-disable import/no-extraneous-dependencies */
import fs from "fs";
import path from "path";

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
  expect(assetsBundlerFiles.length).toBe(2);
  expect(
    files.filter(
      file =>
        !htmlFiles.includes(file) &&
        !jsonApiFiles.includes(file) &&
        !assetsBundlerFiles.includes(file)
    )
  ).toMatchSnapshot();
});

it("should make dynamic pages with pagination", () => {
  const file1 = fs.readFileSync(
    path.join(__dirname, "..", "dist", "repositories", "index.html"),
    { encoding: "utf8" }
  );
  expect(file1).toContain('<div class="PageRepositories-repo">');
  expect(file1).not.toContain("ActivityIndicator");

  const file2 = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "dist",
      "repositories",
      "page",
      "2",
      "index.html"
    ),
    { encoding: "utf8" }
  );
  expect(file2).toContain('<div class="PageRepositories-repo">');
  expect(file2).not.toContain("ActivityIndicator");
});
