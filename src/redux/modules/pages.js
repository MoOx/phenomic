import jsonFetch from "simple-json-fetch"
import joinUri from "../../_utils/join-uri"

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
    const { json } = action.response
    return {
      ...state,
      [action.page]: {
        ...json,
        type: (
          json.head
          ? json.head.layout || json.head.type
          : undefined
        ),
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
      [action.page]: (
        action.response
        ? (
          action.response.status
          ? {
            error: action.response.status,
            errorText: action.response.statusText,
          }
          : {
            error: "Unexpected Error",
            errorText: (
              action.response.message ||
              (action.response.error && action.response.error.message) ||
              // here we are just in a deseperate case
              "Seriously, this is weird. Please report this page."
            ),
          }
        )
        // no response, it's certainly a 404
        : {
          error: 404,
        }
      ),
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
    promise: jsonFetch(joinUri(
      process.env.STATINAMIC_PATHNAME,
      url
    )),
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
    promise: jsonFetch(joinUri(
      process.env.STATINAMIC_PATHNAME,
      url
    )),
  }
}

export function setNotFound(page) {
  return {
    type: ERROR,
    page,
  }
}
