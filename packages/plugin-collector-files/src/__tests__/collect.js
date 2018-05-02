// @flow

import db from "@phenomic/core/lib/db";
import config from "@phenomic/core/lib/defaultConfig.js";

import collector from "..";

import fixtures from "./__fixtures__";

db.destroy();

const p = collector(config, {});
Object.keys(fixtures).map(path => {
  if (p.collectFile)
    p.collectFile({
      db,
      fileName: path,
      parsed: fixtures[path],
      transformer: {
        name: "@phenomic/plugin-default-transform",

        // for testing, according to db
        supportedFileTypes: ["md", "json"],

        transform({ contents }) {
          return {
            partial: {},
            data: {
              body: contents
            }
          };
        }
      }
    });
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
