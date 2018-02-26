[@bs.module "@phenomic/api-client/lib/query"]
external internalQuery : Js.t({..}) => Js.t({..}) = "query";

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
  | Item(queryConfigItem) => {
      "path": queryConfigItem.path,
      "id": Js.Nullable.return(queryConfigItem.id),
      "by": Js.Nullable.undefined,
      "value": Js.Nullable.undefined,
      "order": Js.Nullable.undefined,
      "limit": Js.Nullable.undefined,
      "after": Js.Nullable.undefined
    }
  | List(queryConfigList) => {
      "path": queryConfigList.path,
      "id": Js.Nullable.undefined,
      "by": Js.Nullable.from_opt(queryConfigList.by),
      "value": Js.Nullable.from_opt(queryConfigList.value),
      "order": Js.Nullable.from_opt(queryConfigList.order),
      "limit": Js.Nullable.from_opt(queryConfigList.limit),
      "after": Js.Nullable.undefined
    }
  | PaginatedList(queryConfigPaginatedList) => {
      "path": queryConfigPaginatedList.path,
      "id": Js.Nullable.undefined,
      "by": Js.Nullable.from_opt(queryConfigPaginatedList.by),
      "value": Js.Nullable.from_opt(queryConfigPaginatedList.value),
      "order": Js.Nullable.from_opt(queryConfigPaginatedList.order),
      "limit": Js.Nullable.from_opt(queryConfigPaginatedList.limit),
      "after": Js.Nullable.from_opt(queryConfigPaginatedList.after)
    }
  };
