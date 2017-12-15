import db from "@phenomic/core/lib/db";

import plugin from "..";

import fixtures from "./__fixtures__";

it("should collect stuff", () => {
  db.destroy();

  const p = plugin();
  Object.keys(fixtures).map(path => {
    p.collect(db, path, fixtures[path]);
  });

  expect(db.getDatabase()).toMatchSnapshot();
});
