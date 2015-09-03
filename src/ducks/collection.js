export default function reducer(state = [], action) {

  switch (action.type) {
  case "COLLECTION_GET":
    return []

  case "COLLECTION_SET":
    return action.collection

  case "COLLECTION_FORGET":
    return []

  case "COLLECTION_ERROR":
    return []

  default:
    return state
  }
}
