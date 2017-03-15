import QueryString from "./QueryString"

function performQuery(store, fetch, queries) {
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
