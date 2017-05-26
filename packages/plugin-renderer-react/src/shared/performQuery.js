import { decode } from "./QueryString";
import type { StoreType } from "./store";

function performQuery(
  store: StoreType,
  phenomicFetch: PhenomicFetch,
  queries: phenomic$Queries
) {
  return Promise.all(
    queries.map(key => {
      store.setAsLoading(key);
      return phenomicFetch(decode(key))
        .then(value => {
          store.set(key, value);
        })
        .catch(error => store.setAsError(key, error));
    })
  );
}

export default performQuery;
