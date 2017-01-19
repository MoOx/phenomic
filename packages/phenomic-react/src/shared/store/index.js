const NO_VALUE_EDGE = {
  status: "inactive",
  node: null,
}

function createStore(state = {}) {
  let subscribers = []

  function subscribe(func) {
    subscribers = [ ...subscribers, func ]
    return function unsubscribe() {
      subscribers = subscribers.filter(item => item !== func)
    }
  }

  function get(key) {
    if (state.hasOwnProperty(key)) {
      return state[key]
    }
    return NO_VALUE_EDGE
  }

  function set(key, node) {
    update({
      [key]: {
        status: "idle",
        node,
      },
    })
  }

  function setAsLoading(key) {
    update({
      [key]: {
        status: "loading",
        node: get(key).node,
      },
    })
  }

  function setAsError(key, error) {
    update({
      [key]: {
        status: "error",
        node: null,
        error,
      },
    })
  }

  function update(nextState) {
    state = { ...state, ...nextState }
    subscribers.forEach(func => func())
  }

  function getState() {
    return state
  }

  return {
    subscribe,
    get,
    set,
    setAsLoading,
    setAsError,
    getState,
  }

}

module.exports = createStore
