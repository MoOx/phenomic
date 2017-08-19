/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import fs from "fs";

import globby from "globby";

it("should build example correctly", () => {
  const testFolder = __dirname + "/../dist";
  const files = globby.sync("**/*", {
    cwd: testFolder,
    nodir: true
  });

  // should have html files
  const htmlFiles = files.filter(file => file.endsWith(".html"));
  expect(htmlFiles).toMatchSnapshot();

  const file1 = fs.readFileSync(
    path.join(__dirname, "..", "dist", "index.html"),
    { encoding: "utf8" }
  );
  expect(file1).toContain("Hello World!");
  expect(file1).toContain(
    "font-size:1.5em;text-align:center;color:palevioletred;"
  );

  const file2 = fs.readFileSync(
    path.join(__dirname, "..", "dist", "2", "index.html"),
    { encoding: "utf8" }
  );
  expect(file2).toContain("Hello again!");
  expect(file2).toContain("font-size:2em;text-align:right;color:blue;");
});
