/* eslint-disable import/no-extraneous-dependencies */
import globby from "globby";

it("should build docs correctly", () => {
  const testFolder = __dirname + "/../dist";
  const files = globby.sync("**/*", {
    cwd: testFolder,
    nodir: true
  });

  expect(files.includes("404.html")).toBe(true);
  expect(files.includes("index.html")).toBe(true);
  expect(files.filter(f => f.startsWith("docs/")).length > 0).toBe(true);

  expect(files.includes("news/index.html")).toBe(true);
  expect(files.filter(f => f.startsWith("news/after/")).length > 0).toBe(true);

  expect(files.includes("showcase/index.html")).toBe(true);
  expect(files.filter(f => f.startsWith("showcase/after/")).length > 0).toBe(
    true
  );
  // random tag pages
  expect(files.includes("showcase/tag/blog/index.html")).toBe(true);
  expect(
    files.filter(f => f.startsWith("showcase/tag/blog/after/")).length > 0
  ).toBe(true);
  expect(files.includes("showcase/tag/open-source/index.html")).toBe(true);
  expect(
    files.filter(f => f.startsWith("showcase/tag/open-source/after/")).length >
      0
  ).toBe(true);

  // api json files
  expect(
    files.filter(f => f.startsWith("phenomic") && f.endsWith(".json")).length >
      0
  ).toBe(true);
  expect(files.includes("phenomic/news/by-default/1/desc/limit-10.json")).toBe(
    true
  );
  expect(
    files.includes(
      "phenomic/news/by-default/1/desc/limit-10/after-MjAxNy8wNi9pbnRyb2R1Y2luZy0xLjAuMC1hbHBoYQ==.json"
    )
  ).toBe(true);
  expect(
    files.includes("phenomic/news/item/2017/06/introducing-1.0.0-alpha.json")
  );
  expect(
    files.filter(
      f =>
        f.startsWith("phenomic/showcase-entries/by-default") &&
        f.endsWith(".json")
    ).length > 0
  ).toBe(true);
  expect(
    files.filter(
      f =>
        f.startsWith("phenomic/showcase-entries/by-showcaseTags") &&
        f.endsWith(".json")
    ).length > 0
  ).toBe(true);
});
