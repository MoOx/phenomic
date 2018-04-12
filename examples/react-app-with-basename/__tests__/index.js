// @flow

/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import fs from "fs";

it("should build example correctly", () => {
  const file1 = fs.readFileSync(
    path.join(__dirname, "..", "dist", "index.html"),
    { encoding: "utf8" }
  );
  expect(file1).toContain('<a href="/website/base/test"');
  expect(file1).toContain('script src="/website/base/phenomic/phenomic.main');

  const file2 = fs.readFileSync(
    path.join(__dirname, "..", "dist", "test", "index.html"),
    { encoding: "utf8" }
  );
  expect(file2).toContain('<a href="/website/base/"');
});
