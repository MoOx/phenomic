import db from "@phenomic/core/lib/db";

import plugin from "..";

import fixtures from "./__fixtures__";

db.destroy();

const p = plugin();
Object.keys(fixtures).map(path => {
  p.collect(db, path, fixtures[path]);
});

it("should collect everything", async () => {
  expect(await db.getList("__null__")).toMatchSnapshot();
});

it("should collect specific path", async () => {
  expect(await db.getList("news/2017")).toMatchSnapshot();
});

it("should collect metadata", async () => {
  expect(await db.getList("showcaseTags")).toMatchSnapshot();
});

it("should collect specific item", async () => {
  expect(
    await db.get("__null__", "news/2017/06/introducing-1.0.0-alpha")
  ).toMatchSnapshot();
});
