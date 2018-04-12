// @flow

/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import fs from "fs";

it("should build example correctly", () => {
  const file1 = fs.readFileSync(
    path.join(__dirname, "..", "dist", "index.html"),
    { encoding: "utf8" }
  );
  expect(file1).toContain("This is a Markdown file");
  expect(file1).not.toContain(
    ">This is some content visible during development only"
    // - ">" is important in this test as we test it's not in the html
    // but it's in the json as in this example we filter during rendering
    // - well it's bad, isn't it?
    // - not sure as you can imagine a toggle to enable draft doc!
  );
});
