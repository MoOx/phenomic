let joinListOfString = (~glue=",", listOfString) =>
  String.concat(glue, listOfString);

type table = {
  name: string,
  fields: list((string, string)),
};

type database = list(table);

type schemaItem =
  | String(string)
  | Number(float)
  | List(list(schemaItem))
  | Complex(string);

type schema = list(schemaItem);

let rec schemaItemFromJs = value =>
  switch (Js.typeof(value)) {
  | "string" => String(value->Obj.magic)
  | "number" => Number(value->Obj.magic)
  | _ when Js.Array.isArray(value) =>
    List(value->Obj.magic->Belt.Array.map(schemaItemFromJs)->Array.to_list)
  | _ => Complex(value->Obj.magic)
  };

let schemaFromJson = json =>
  json
  ->Obj.magic
  ->Js.Dict.entries
  ->Array.to_list
  ->Belt.List.map(((key, value)) => (key, schemaItemFromJs(value)));

let rec tablesFromSchema = (name, schema) => {
  let (fields, tablesFromDeepStructures) =
    Belt.List.reduce(schema, ([], []), ((fields, tables), (key, value)) =>
      switch (value) {
      | String(_string) => (List.append(fields, [(key, "TEXT")]), tables)
      | Number(_number) => (List.append(fields, [(key, "REAL")]), tables)
      | List(list) => (
          fields,
          List.append(
            tables,
            tablesFromSchema(key, [("__id__", List.hd(list))]),
          ),
        )
      | Complex(_data) => (List.append(fields, [(key, "BLOB")]), tables)
      }
    );
  [{name, fields}, ...tablesFromDeepStructures];
};

let sqlStatementsFromTables = (tables) => {
  Belt.List.reduce(tables, [], (statements, table) => {
    let sqlForFields = Belt.List.reduce(table.fields, [], (columns, (key, datatype)) => List.append(columns, [key ++ " " ++ datatype]));
    List.append(statements, ["CREATE TABLE " ++ table.name ++ "(" ++ joinListOfString(sqlForFields) ++ ");"])
  });
}

let makeDb = (~name="phenomic.db", ~inMemory, _) =>
  BsBetterSqlite3.make(name, {"memory": inMemory});
/*
 export default {
   addResource(type, id, data) {
     let currentModel = schemaFromJson(type, data);

     // db.prepare("")
   }
   // addRelation(id)
 };
 */
