open Jest;
open Expect;

let sample = {
  "date": "2017-06-02T00:00:00.000Z",
  "title": "Introducing Phenomic 1.0.0 first alpha",
  "authors": ["bloodyowl"],
  "body": {
    "t": "div",
    "c": ["Hi there. Alpha blah blah."]
  }
}

let schema = Db.schemaFromJson(sample)
let tables = schema |> Db.tablesFromSchema("test")
let sqlStatements = tables |> Db.sqlStatementsFromTables

test("should generate schema from json", () => {
  expect(
    schema
  ) |> toMatchSnapshot
});

test("should generate tables structure from schema", () => {
  expect(
    tables
  ) |> toMatchSnapshot
});

test("should generate sql from tables structures", () => {
  expect(
    sqlStatements
  ) |> toMatchSnapshot
});
