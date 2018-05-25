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
  sort: option(string),
  limit: option(int)
};

type paginatedListConfig = {
  path: string,
  by: option(string),
  value: option(string),
  order: option(string),
  sort: option(string),
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
      "sort": Js.Nullable.undefined,
      "limit": Js.Nullable.undefined,
      "after": Js.Nullable.undefined
    }
  | List(queryConfigList) => {
      "path": queryConfigList.path,
      "id": Js.Nullable.undefined,
      "by": Js.Nullable.fromOption(queryConfigList.by),
      "value": Js.Nullable.fromOption(queryConfigList.value),
      "order": Js.Nullable.fromOption(queryConfigList.order),
      "sort": Js.Nullable.fromOption(queryConfigList.sort),
      "limit": Js.Nullable.fromOption(queryConfigList.limit),
      "after": Js.Nullable.undefined
    }
  | PaginatedList(queryConfigPaginatedList) => {
      "path": queryConfigPaginatedList.path,
      "id": Js.Nullable.undefined,
      "by": Js.Nullable.fromOption(queryConfigPaginatedList.by),
      "value": Js.Nullable.fromOption(queryConfigPaginatedList.value),
      "order": Js.Nullable.fromOption(queryConfigPaginatedList.order),
      "sort": Js.Nullable.fromOption(queryConfigPaginatedList.sort),
      "limit": Js.Nullable.fromOption(queryConfigPaginatedList.limit),
      "after": Js.Nullable.fromOption(queryConfigPaginatedList.after)
    }
  };
