import fetchJSON from "../fetchJSON"

export const GET = "statinamic/pages/GET"
export const SET = "statinamic/pages/SET"
export const SET_TYPE = "statinamic/pages/SET_TYPE"
export const FORGET = "statinamic/pages/FORGET"
export const ERROR = "statinamic/pages/ERROR"

// redux reducer
export default function reducer(state = {}, action) {

  switch (action.type) {
  case GET:
    return {
      ...state,
      [action.page]: {
        loading: true,
      },
    }

  case SET:
    const data = action.response.data
    return {
      ...state,
      [action.page]: {
        ...data,
        type: data.head ? data.head.layout || data.head.type : undefined,
      },
    }

  case FORGET:
    return {
      ...state,
      [action.page]: undefined,
    }

  case ERROR:
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
      GET,
      SET,
      ERROR,
    ],
    page,
    promise: fetchJSON(
      // TODO maybe we should just use path.join below...
      (
        page
          ? `/${ page }`
          : ""
      ) +
      "/index.json"
    ),
  }
}
