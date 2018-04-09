/* eslint-disable import/no-extraneous-dependencies */
import globby from "globby";

const testFolder = __dirname + "/../dist";
const files = globby.sync("**/*", {
  cwd: testFolder,
  nodir: true,
  dot: true
});

it("should have basic pages", () => {
  expect(files.includes("404.html")).toBeTruthy();
  expect(files.includes("index.html")).toBeTruthy();
  expect(files.filter(f => f.startsWith("docs/"))).toMatchSnapshot();
  expect(files.includes("blog/index.html")).toBeTruthy();
  expect(files.includes("showcase/index.html")).toBeTruthy();
  expect(files.includes("feed.xml")).toBeTruthy();
});

it("should have some generated pages for pagination", () => {
  expect(files.filter(f => f.startsWith("blog/after/")).length).toBeGreaterThan(
    0
  );
  expect(
    files.filter(f => f.startsWith("showcase/after/")).length
  ).toBeGreaterThan(0);
});

it("should have some generated pages for metadata and pagination", () => {
  // random tag pages
  expect(files.includes("showcase/tag/blog/index.html")).toBeTruthy();
  expect(
    files.filter(f => f.startsWith("showcase/tag/blog/after/")).length
  ).toBeGreaterThan(0);
  expect(files.includes("showcase/tag/open-source/index.html")).toBeTruthy();
  expect(
    files.filter(f => f.startsWith("showcase/tag/open-source/after/")).length
  ).toBeGreaterThan(0);
});

it("should have api files", () => {
  expect(
    files.filter(f => f.startsWith("phenomic") && f.endsWith(".json")).length
  ).toBeGreaterThan(0);
  expect(
    files.includes("phenomic/blog/by-default/1/desc/limit-10.json")
  ).toBeTruthy();
  expect(
    files.includes(
      "phenomic/blog/by-default/1/desc/limit-10/after-MjAxNy8wNi9pbnRyb2R1Y2luZy0xLjAuMC1hbHBoYQ==.json"
    )
  ).toBeTruthy();
  expect(
    files.includes("phenomic/blog/item/2017-06-02-introducing-1.0.0-alpha.json")
  ).toBeTruthy();
  expect(
    files.filter(
      f =>
        f.startsWith("phenomic/showcase/entry/by-default") &&
        f.endsWith(".json")
    ).length
  ).toBeGreaterThan(0);
  expect(
    files.filter(
      f =>
        f.startsWith("phenomic/showcase/entry/by-showcaseTags") &&
        f.endsWith(".json")
    ).length
  ).toBeGreaterThan(0);
});
