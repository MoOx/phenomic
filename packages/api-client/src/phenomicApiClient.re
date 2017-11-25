[@bs.module "@phenomic/api-client/lib/query"] external internalQuery : Js.t({..}) => Js.t({..}) =
  "query";

type queryConfigItem = {
  path: string,
  id: string
};

type listConfig = {
  path: string,
  by: option(string),
  value: option(string),
  order: option(string),
  limit: option(int)
};

type paginatedListConfig = {
  path: string,
  by: option(string),
  value: option(string),
  order: option(string),
  limit: option(int),
  after: option(string)
};

type queryConfig =
  | Item(queryConfigItem)
  | List(listConfig)
  | PaginatedList(paginatedListConfig);

let query = (queryConfig) =>
  switch queryConfig {
  | Item(queryConfigItem) =>
    Js.Obj.assign(Js.Obj.empty(), {"path": queryConfigItem.path, "id": queryConfigItem.id})
  | List(queryConfigList) =>
    Js.Obj.assign(
      Js.Obj.empty(),
      {
        "path": queryConfigList.path,
        "by": Js.Null_undefined.from_opt(queryConfigList.by),
        "value": Js.Null_undefined.from_opt(queryConfigList.value),
        "order": Js.Null_undefined.from_opt(queryConfigList.order),
        "limit": Js.Null_undefined.from_opt(queryConfigList.limit)
      }
    )
  | PaginatedList(queryConfigPaginatedList) =>
    Js.Obj.assign(
      Js.Obj.empty(),
      {
        "path": queryConfigPaginatedList.path,
        "by": Js.Null_undefined.from_opt(queryConfigPaginatedList.by),
        "value": Js.Null_undefined.from_opt(queryConfigPaginatedList.value),
        "order": Js.Null_undefined.from_opt(queryConfigPaginatedList.order),
        "limit": Js.Null_undefined.from_opt(queryConfigPaginatedList.limit),
        "after": Js.Null_undefined.from_opt(queryConfigPaginatedList.after)
      }
    )
  };
