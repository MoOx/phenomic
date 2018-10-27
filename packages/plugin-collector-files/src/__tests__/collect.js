// @flow

import createDB from "@phenomic/core/lib/db";
import defaultConfig from "@phenomic/core/lib/defaultConfig.js";

import collector from "..";

const db = createDB({});

const config = {
  ...defaultConfig,
  path: __dirname,
  content: {
    "": { root: "__fixtures__", globs: ["**/*"] },
  },
};

const p = collector(config, {});
it("should collect everything", async () => {
  if (p.collect) {
    await p.collect({
      db,
      transformers: [
        {
          name: "@phenomic/plugin-default-transform",
          supportedFileTypes: ["json"],
          transform({ contents }) {
            return JSON.parse(contents.toString());
          },
        },
      ],
    });
  }

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
    await db.get("__null__", "news/2017/06/introducing-1.0.0-alpha"),
  ).toMatchSnapshot();
});
