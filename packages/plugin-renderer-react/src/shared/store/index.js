type StateType = Object;
type SubscriberType = Function;

const NO_VALUE_EDGE = {
  status: "inactive",
  node: null
};

export type unsubscribeType = () => void;
export type StoreType = {
  subscribe: (func: SubscriberType) => unsubscribeType,
  get: (key: string) => any,
  set: (key: string, node: any) => void,
  setAsLoading: (key: string) => any,
  setAsError: (key: string, node: any) => any,
  getState: () => StateType
};

function createStore(state: StateType = {}): StoreType {
  let subscribers: Array<SubscriberType> = [];

  function subscribe(func: SubscriberType) {
    subscribers = [...subscribers, func];
    return function unsubscribe() {
      subscribers = subscribers.filter(item => item !== func);
    };
  }

  function get(key: string) {
    if (state.hasOwnProperty(key)) {
      return state[key];
    }
    return NO_VALUE_EDGE;
  }

  function set(key: string, node: any) {
    update({
      [key]: {
        status: "idle",
        node
      }
    });
  }

  function setAsLoading(key: string) {
    update({
      [key]: {
        status: "loading",
        node: get(key).node
      }
    });
  }

  function setAsError(key: string, error: any) {
    update({
      [key]: {
        status: "error",
        node: null,
        error
      }
    });
  }

  function update(nextState: StateType) {
    state = { ...state, ...nextState };
    subscribers.forEach(func => func());
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    get,
    set,
    setAsLoading,
    setAsError,
    getState
  };
}

export default createStore;
