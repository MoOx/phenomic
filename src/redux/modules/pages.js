import fetchJSON from "../../fetchJSON"

export const NOOP = "statinamic/pages/NOOP"
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
      [action.page]: action.error && action.error.response
        ? {
          error: action.error.response.status,
          errorText: action.error.response.statusText,
        }
        : {
          error: 404,
          errorText: `Page Not Found`,
        },
    }

  default:
    return state
  }
}

// redux actions
export function get(page, url) {
  return {
    types: [
      GET,
      SET,
      ERROR,
    ],
    page,
    promise: fetchJSON(url),
  }
}

export function refresh(page, url) {
  return {
    types: [
      NOOP,
      SET,
      ERROR,
    ],
    page,
    promise: fetchJSON(url),
  }
}

export function setNotFound(page) {
  return {
    type: ERROR,
    page,
  }
}
