export default function promiseMiddleware(): Function {
  return (next) => (action) => {
    const { promise, types, ...rest } = action
    if (!promise) {
      return next(action)
    }
    else if (!promise.then) {
      throw new Error(
        "promiseMiddleware expects a promise object that implements then()"
      )
    }

    const [ REQUEST, SUCCESS, FAILURE ] = types
    next({ ...rest, type: REQUEST })
    return promise.then(
      (response) => next({ ...rest, response, type: SUCCESS }),
      (response) => next({ ...rest, response, type: FAILURE })
    )
  }
}
