// @flow

import fetchRestApi from "@phenomic/api-client/lib/fetch";

import { decode } from "./QueryString";
import type { StoreType } from "./store";

function performQuery(store: StoreType, queries: phenomic$Queries) {
  return Promise.all(
    queries.map(key => {
      store.setAsLoading(key);
      return fetchRestApi(decode(key))
        .then(value => store.set(key, value))
        .catch(error => store.setAsError(key, error));
    })
  );
}

export default performQuery;
