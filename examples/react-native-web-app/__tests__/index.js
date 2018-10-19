// @flow

/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import fs from "fs";

it("should build example correctly", () => {
  const file1 = fs.readFileSync(
    path.join(__dirname, "..", "dist", "index.html"),
    { encoding: "utf8" }
  );
  const file2 = fs.readFileSync(
    path.join(__dirname, "..", "dist", "2", "index.html"),
    { encoding: "utf8" }
  );

  expect(file1).toContain("Hello World!");
  expect(file1).toContain("font-size:1.5em");
  expect(file1).toContain("text-align:center");
  // expect(file1).toContain("color:palevioletred");
  expect(file1).toContain("color:rgba(219,112,147,1.00)");
  expect(file1).not.toContain("Hello again!");
  expect(file1).not.toContain("font-size:2em");
  expect(file1).not.toContain("text-align:right");
  // expect(file1).not.toContain("color:blue");
  expect(file1).not.toContain("color:rgba(0,0,255,1.00)");

  expect(file2).not.toContain("Hello World!");
  expect(file2).not.toContain("font-size:1.5em");
  expect(file2).not.toContain("text-align:center");
  // expect(file2).not.toContain("color:palevioletred");
  expect(file2).not.toContain("color:rgba(219,112,147,1.00)");
  expect(file2).toContain("Hello again!");
  expect(file2).toContain("font-size:2em");
  expect(file2).toContain("text-align:right");
  // expect(file2).toContain("color:blue");
  expect(file2).toContain("color:rgba(0,0,255,1.00)");
});
