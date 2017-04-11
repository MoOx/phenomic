import QueryString from "./QueryString"
import type { StoreType } from "./store"

function performQuery(store: StoreType, fetch: PhenomicFetch, queries: phenomic$Queries) {
  return Promise.all(
    queries.map(key => {
      store.setAsLoading(key)
      return fetch(QueryString.decode(key))
        .then(value => {
          store.set(key, value)
        })
        .catch(error => {
          store.setAsError(key, error)
        })
    })
  )
}

export default performQuery
