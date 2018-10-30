type database = {
  .
  "inTransaction": bool,
  "open": bool,
  "memory": bool,
  "readonly": bool,
  "name": string,
};
type statement;
type statementInfo = {
  .
  "changes": int,
  "lastInsertRowid": int,
};
type options = {. "memory": bool};

[@bs.new] [@bs.module]
external make : (string, options) => database = "better-sqlite3";

[@bs.send] external close : database => unit = "";

[@bs.send] external prepare : (database, string) => statement = "";

[@bs.send] external run : statement => statementInfo = "";
