export const COLLECTION_GET = "COLLECTION_GET"
export const COLLECTION_SET = "COLLECTION_SET"
export const COLLECTION_FORGET = "COLLECTION_FORGET"
export const COLLECTION_ERROR = "COLLECTION_ERROR"

export default function reducer(state = [], action) {

  switch (action.type) {
  case COLLECTION_GET:
    return []

  case COLLECTION_SET:
    return action.collection

  case COLLECTION_FORGET:
    return []

  case COLLECTION_ERROR:
    return []

  default:
    return state
  }
}

export const set = (data) => ({
  type: COLLECTION_SET,
  collection: data,
})

export const error = (error) => ({
  type: COLLECTION_ERROR,
  error,
})
