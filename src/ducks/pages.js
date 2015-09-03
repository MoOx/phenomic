import fetchJSON from "../fetchJSON"

// redux reducer
export default function reducer(state = {}, action) {

  switch (action.type) {
  case "PAGE_GET":
    return {
      ...state,
      [action.page]: {
        loading: true,
      },
    }

  case "PAGE_SET":
    const data = action.response.data
    return {
      ...state,
      [action.page]: {
        ...data,
        type: data.head ? data.head.layout || data.head.type : "Page",
      },
    }

  case "PAGE_FORGET":
    return {
      ...state,
      [action.page]: undefined,
    }

  case "PAGE_ERROR":
    return {
      ...state,
      [action.page]: action.error.response
        ? {
          error: action.error.response.status,
          errorText: action.error.response.statusText,
        }
        : {
          ...action.error,
        },
    }

  default:
    return state
  }
}

// redux actions
export function get(page) {
  return {
    types: [
      "PAGE_GET",
      "PAGE_SET",
      "PAGE_ERROR",
    ],
    page,
    promise: fetchJSON(`/${ page }/index.json`),
  }
}

export function setType(page, type) {
  return {
    type: "PAGE_TYPE",
    page,
    pageType: type,
  }
}

export function unknownType(page, type) {
  return {
    type: "PAGE_ERROR",
    page,
    error: {
      error: "Unkown page type",
      errorText: (
        `"${ type }" component not available in ` +
        `"pageComponents" prop`
      ),
    },
  }
}
