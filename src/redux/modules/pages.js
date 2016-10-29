/* @flow */
import jsonFetch from "simple-json-fetch"

import pathToUri from "../../_utils/path-to-uri"

export const NOOP = "phenomic/pages/NOOP"
export const GET = "phenomic/pages/GET"
export const SET = "phenomic/pages/SET"
export const SET_TYPE = "phenomic/pages/SET_TYPE"
export const FORGET = "phenomic/pages/FORGET"
export const ERROR = "phenomic/pages/ERROR"

// redux reducer
export default function reducer(
  state?: Object = {},
  action: {
    type: string,
    page: string,
    response: Object
  }
): Object {

  switch (action.type) {
  case GET:
    return {
      ...state,
      [action.page]: {
        isLoading: true,
      },
    }

  case SET: {
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
export function get(page: string, url: string): PromiseAction {
  return {
    types: [
      GET,
      SET,
      ERROR,
    ],
    page,
    promise: jsonFetch(pathToUri(
      process.env.PHENOMIC_USER_PATHNAME,
      url
    )),
  }
}

export function refresh(page: string, url: string): PromiseAction {
  return {
    types: [
      NOOP,
      SET,
      ERROR,
    ],
    page,
    promise: jsonFetch(pathToUri(
      process.env.PHENOMIC_USER_PATHNAME,
      url
    )),
  }
}

export function setNotFound(page: string): Object {
  return {
    type: ERROR,
    page,
  }
}
